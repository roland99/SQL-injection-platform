package com.example.demo.Levels;

import com.example.demo.DTO.LoginDto;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Component
public class VulnerableDAO {

    private final DataSource dataSource;
    private final EntityManager em;

    public VulnerableDAO(@Qualifier("productDataSource") DataSource dataSource, EntityManager em) {
        this.dataSource = dataSource;
        this.em = em;
    }

    public List<Product> unsafeFindProducts(String productName) throws SQLException{

        String sql = "select " + "* from Product where product = '" + productName + "'";

        System.out.println("DataSource: " + dataSource.toString());
        try (Connection c = dataSource.getConnection();
             ResultSet rs = c.createStatement()
                     .executeQuery(sql)) {
            List<Product> products = new ArrayList<>();
            while (rs.next()) {
                Product lvl1 = Product.builder()
                        .id(rs.getLong("id"))
                        .product(rs.getString("product"))
                        .description(rs.getString("description"))
                        .build();

                products.add(lvl1);
            }

            return products;
        } catch (SQLException ex) {
            throw ex;
        }
    }

    public UserTable unsafeLoginUser(LoginDto loginDto) throws SQLException{

        String sql = "select " + "username from UserTable where username = '" + loginDto.getEmail() + "'" + " and password= '" + loginDto.getPassword() + "'";

        System.out.println("DataSource: " + dataSource.toString());
        try (Connection c = dataSource.getConnection();
             ResultSet rs = c.createStatement()
                     .executeQuery(sql)) {

            UserTable user = null;
            while (rs.next()) {
                user = UserTable.builder()
                        .username(rs.getString("username"))
                        .build();
            }

            return user;
        } catch (SQLException ex) {
            throw ex;
        }
    }

    public NewClientTable unsafeLoginClient(LoginDto loginDto) throws SQLException{

        String sql = "select " + "* from NewClientTable where username = '" + loginDto.getEmail() + "'" + " and password= '" + loginDto.getPassword() + "'";

        System.out.println("DataSource: " + dataSource.toString());
        try (Connection c = dataSource.getConnection();
             ResultSet rs = c.createStatement()
                     .executeQuery(sql)) {

            NewClientTable user = null;
            while (rs.next()) {
                user = NewClientTable.builder()
                        .username(rs.getString("username"))
                        .password(rs.getString("password"))
                        .build();
            }

            return user;
        } catch (SQLException ex) {
            throw ex;
        }
    }

    public NewClientTable unsafeLoginClientOneRow(LoginDto loginDto) throws SQLException{

        String sql = "select " + "username from NewClientTable where username = '" + loginDto.getEmail() + "'" + " and password= '" + loginDto.getPassword() + "'";


        try (Connection c = dataSource.getConnection();
             ResultSet rs = c.createStatement()
                     .executeQuery(sql)) {

            NewClientTable user = null;
            System.out.println(rs.toString());
            while (rs.next()) {
                user = NewClientTable.builder()
                        .username(rs.getString("username"))
                        .build();
                break;
            }


            return user;
        } catch (SQLException ex) {
            throw ex;
        }
    }
}
