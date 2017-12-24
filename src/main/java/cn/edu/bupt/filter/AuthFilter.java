package cn.edu.bupt.filter;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Created by Administrator on 2017/12/23.
 */
@WebFilter(filterName="authFilter",urlPatterns="/*")
public class AuthFilter implements Filter {
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest requ = (HttpServletRequest)servletRequest;
        HttpServletResponse resp = (HttpServletResponse)servletResponse;
        String path = requ.getRequestURI();
        String method = requ.getMethod().toLowerCase();
        if(path.endsWith(".html")||path.endsWith(".css")||path.endsWith(".js")||path.endsWith(".png")||path.endsWith(".jpg")||path.endsWith(".db ")){
            filterChain.doFilter(servletRequest,servletResponse);
            return ;
        }
        if(method.equals("post")){
            Object username = requ.getSession().getAttribute("username");
            Object password = requ.getSession().getAttribute("password");
            if(username!=null&&password!=null){
                filterChain.doFilter(servletRequest,servletResponse);
            }else{
                resp.sendRedirect("/login");
            }
        }else{
            if(path.equals("/login")){
                filterChain.doFilter(servletRequest,servletResponse);
            }else if(path.equals("/homepage")){
                filterChain.doFilter(servletRequest,servletResponse);
            }else {
                Object isLogin = ((HttpServletRequest) servletRequest).getSession().getAttribute("login");
                if(isLogin!=null&&((String)isLogin).equals("login")){
                    filterChain.doFilter(servletRequest,servletResponse);
                }else{
                    resp.sendRedirect("/login");
                }
            }
        }
    }

    @Override
    public void destroy() {

    }
}
