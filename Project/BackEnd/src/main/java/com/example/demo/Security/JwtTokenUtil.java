package com.example.demo.Security;

import com.example.demo.DTO.UserDto;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.Date;
import java.util.function.Function;

@Component
public class JwtTokenUtil {

    private static final String signInKey = "verysecuresignaturekey";
    private static final int accessTokenValiditySeconds = 120 * 60;

    public String getUsernameFromToken(String token){
        return getClaimFromToken(token, Claims::getSubject);
    }

    private <T> T getClaimFromToken(String token, Function<Claims,T> claimsResolver){
        final Claims claims = getAllClaimsFromToken(token);
        return claimsResolver.apply(claims);
    }

    private Claims getAllClaimsFromToken(String token){
        return Jwts.parser().setSigningKey(signInKey).parseClaimsJws(token).getBody();
    }

    private Date getExpirationDateFromToken(String token){
        return getClaimFromToken(token, Claims::getExpiration);
    }

    private Boolean isTokenExpired(String token){
        final Date expireDate = getExpirationDateFromToken(token);
        return expireDate.before(new Date());
    }

    private String doGenerateToken(String email){
        Claims claims = Jwts.claims().setSubject(email);
        claims.put("scopes", Arrays.asList(new SimpleGrantedAuthority("ROLE_ADMIN")));
        return Jwts.builder().setClaims(claims).setIssuer("http://devglan.com").setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + accessTokenValiditySeconds * 1000)).signWith(SignatureAlgorithm.HS256, signInKey).compact();

    }

    public String generateToken(UserDto userDto){
        return doGenerateToken(userDto.getEmail());
    }

}
