package com.example.demo.Security;

import com.example.demo.Repository.UserRepository;
import io.jsonwebtoken.ExpiredJwtException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import static org.apache.logging.log4j.util.Strings.isEmpty;


@Component
@Slf4j
public class JwtTokenFilter extends OncePerRequestFilter {

    private final JwtTokenUtil jwtTokenUtil;
    @Autowired
    private final UserRepository userRepository;

    public JwtTokenFilter(JwtTokenUtil jwtTokenUtil, UserRepository userRepository){
        this.jwtTokenUtil = jwtTokenUtil;
        this.userRepository = userRepository;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        final String header = request.getHeader(HttpHeaders.AUTHORIZATION);
        if(isEmpty(header) || !header.startsWith("Bearer ")){
            filterChain.doFilter(request,response);
            return;
        }

        String token = header.split(" ")[1].trim();
        UserDetails userDetails = null;

        try{
            userDetails = userRepository.findByEmail(jwtTokenUtil.getUsernameFromToken(token)).orElse(null);
        }catch (ExpiredJwtException exception){
            System.out.println(exception.getMessage());
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
        }

        //User not found
        if(userDetails == null){
           filterChain.doFilter(request,response);
           return;
        }
        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
        authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        log.info("Success auth");
        filterChain.doFilter(request,response);
    }
}
