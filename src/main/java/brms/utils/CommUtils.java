package brms.utils;

import java.io.IOException;
import java.util.Properties;

/**
 * Created by Administrator on 2015/12/9.
 */
public class CommUtils {

	public static String getProperty(String propertiesFileName, String key) {  
        Properties props = new Properties();  
        try {  
            props.load(CommUtils.class.getResourceAsStream("/" + propertiesFileName));  
        } catch (IOException e) {  
            e.printStackTrace();  
        }  
        return (String) props.get(key);  
    } 
}
