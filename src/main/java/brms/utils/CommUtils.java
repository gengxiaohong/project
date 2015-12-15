package brms.utils;

/**
 * Created by Administrator on 2015/9/19 0019.
 */
public class CommUtils {
    public static String readUrl(String url){
    	if("BASE_URL".equals(url)) {
    		return "http://42.62.77.189/api/";
    	} else if("STATISTICAL_URL".equals(url)) {
    		return "http://42.62.77.189/api/";
    	}
    	return null;
    }
}
