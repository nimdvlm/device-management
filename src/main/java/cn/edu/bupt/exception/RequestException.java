package cn.edu.bupt.exception;

/**
 * Created by Administrator on 2017/12/24.
 */
public class RequestException extends Exception{

    public RequestException(){
        super();
    }
    public RequestException(String msg){
        super(msg);
    }
}
