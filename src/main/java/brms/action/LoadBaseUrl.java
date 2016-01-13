package brms.action;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.json.JSONException;
import org.json.JSONObject;

public class LoadBaseUrl extends HttpServlet {
    private static Logger logger = Logger.getLogger(LoadBaseUrl.class);

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doPost(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    	try {
    		String json = "{\"base_url\": \""+Proxy.BASE_URL+"\", \"statistical_url\": \""+Proxy.STATISTICAL_URL+"\"}";
            JSONObject jsonObject = new JSONObject(json);
            resp.getWriter().println(jsonObject.toString());
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }
}
