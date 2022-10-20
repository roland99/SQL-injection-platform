package com.example.demo.Levels;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.orm.jpa.JpaProperties;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.JpaVendorAdapter;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.persistenceunit.PersistenceUnitManager;
import org.springframework.orm.jpa.vendor.AbstractJpaVendorAdapter;
import org.springframework.orm.jpa.vendor.Database;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.persistence.EntityManagerFactory;
import javax.sql.DataSource;
import java.util.HashMap;
import java.util.Map;

@Configuration
@EnableTransactionManagement
@EnableJpaRepositories(
        entityManagerFactoryRef = "productEntityManagerFactory",
        transactionManagerRef = "productTransactionManager",
        basePackages = {
                "com.example.demo.Levels.repo"
        }
)
public class VulnerableDBConfiguration {

    @Autowired(required = false)
    private PersistenceUnitManager persistenceUnitManager;

    @Bean(name = "productDataSource")
    @ConfigurationProperties(prefix = "db2.datasource")
    public DataSource dataSource(){
        return DataSourceBuilder.create().build();
    }

    protected AbstractJpaVendorAdapter createJpaVendorAdapter() {
        return new HibernateJpaVendorAdapter();
    }

    public JpaVendorAdapter getJpaVendorAdapter() {
        AbstractJpaVendorAdapter adapter = createJpaVendorAdapter();
        adapter.setShowSql(false);
        adapter.setDatabase(Database.H2);
        adapter.setDatabasePlatform("org.hibernate.dialect.H2Dialect");
        adapter.setGenerateDdl(true);
        return adapter;
    }

    public EntityManagerFactoryBuilder getEntityManagerFactoryBuilder() {
        JpaVendorAdapter jpaVendorAdapter = getJpaVendorAdapter();
        return new EntityManagerFactoryBuilder(
                jpaVendorAdapter, new JpaProperties().getProperties(),
                this.persistenceUnitManager);
    }

    @Bean(name = "productEntityManagerFactory")
    public LocalContainerEntityManagerFactoryBean entityManagerFactory( @Qualifier("productDataSource")DataSource dataSource){
        Map<String, Object> properties = new HashMap<String, Object>();
        EntityManagerFactoryBuilder builder = getEntityManagerFactoryBuilder();
        properties.put("hibernate.hbm2ddl.auto", "update");
        return builder.dataSource(dataSource)
                .packages("com.example.demo.Levels")
                .properties(properties)
                .persistenceUnit("dbv")
                .build();
    }

    @Bean(name = "productTransactionManager")
    public PlatformTransactionManager level1TransactionManager(
            @Qualifier("productEntityManagerFactory") EntityManagerFactory level1EntityManagerFactory
    ){
        return new JpaTransactionManager(level1EntityManagerFactory);
    }
}
