package cn.edu.bupt;

import com.google.gson.JsonObject;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.SpringBootConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.context.annotation.ComponentScan;

/**
 * Created by Administrator on 2017/12/23.
 */
@SpringBootConfiguration
@SpringBootApplication
@ComponentScan({"cn.edu.bupt"})
@ServletComponentScan
public class App{
    public static void main(String[] args) {
       SpringApplication.run(App.class, args);
    }
}
