package com.example.demo.Repository.Config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.orm.jpa.JpaProperties;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
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
        entityManagerFactoryRef = "normalEntityManagerFactory",
        transactionManagerRef = "normalTransactionManager",
        basePackages = {
                "com.example.demo.Repository"
        }
)
public class NormalConfiguration {

    @Autowired(required = false)
    private PersistenceUnitManager persistenceUnitManager;

    @Primary
    @Bean(name = "normalDataSource")
    @ConfigurationProperties(prefix = "spring.datasource")
    public DataSource normalDataSource(){
        return DataSourceBuilder.create().build();
    }

    protected AbstractJpaVendorAdapter createJpaVendorAdapter() {
        return new HibernateJpaVendorAdapter();
    }

    public JpaVendorAdapter getJpaVendorAdapter() {
        AbstractJpaVendorAdapter adapter = createJpaVendorAdapter();
        adapter.setShowSql(false);
        adapter.setDatabase(Database.POSTGRESQL);
        adapter.setDatabasePlatform("org.hibernate.dialect.PostgreSQLDialect");
        adapter.setGenerateDdl(true);
        return adapter;
    }

    public EntityManagerFactoryBuilder getEntityManagerFactoryBuilder() {
        JpaVendorAdapter jpaVendorAdapter = getJpaVendorAdapter();
        return new EntityManagerFactoryBuilder(
                jpaVendorAdapter, new JpaProperties().getProperties(),
                this.persistenceUnitManager);
    }


    @Primary
    @Bean(name = "normalEntityManagerFactory")
    public LocalContainerEntityManagerFactoryBean entityManagerFactory(
            @Qualifier("normalDataSource") DataSource dataSource
    ){
        Map<String, Object> properties = new HashMap<String, Object>();
        properties.put("hibernate.hbm2ddl.auto", "update");
        EntityManagerFactoryBuilder builder = getEntityManagerFactoryBuilder();
        return builder
                .dataSource(dataSource)
                .packages("com.example.demo.Entity")
                .properties(properties)
                .persistenceUnit("licenta")
                .build();
    }

    @Primary
    @Bean(name = "normalTransactionManager")
    public PlatformTransactionManager normalTransactionManager(
            @Qualifier("normalEntityManagerFactory")EntityManagerFactory normalEntityManagerFactory
            ){
        return new JpaTransactionManager(normalEntityManagerFactory);
    }
}
