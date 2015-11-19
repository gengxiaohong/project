package brms.filter;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.IOException;

/**
 * Created by ligson on 2015/8/19.
 */
public class BrowserFilter implements Filter {
    public void destroy() {
    }

    public void doFilter(ServletRequest req, ServletResponse resp, FilterChain chain) throws ServletException, IOException {
        HttpServletRequest request = (HttpServletRequest)req;
        //System.out.println(request.getHeader("User-Agent"));
        HttpServletResponse response = (HttpServletResponse)resp;
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
		response.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, OPTIONS, DELETE");
		response.setHeader("Access-Control-Max-Age", "3600");
		response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-CSRF-Token, X-XSRF-Token, Session-ID");
		response.setHeader("Access-Control-Allow-Credentials", "true"); 
        chain.doFilter(req, resp);
    }

    public void init(FilterConfig config) throws ServletException {

    }

}
