<?php 
  require_once('config.php');
  //连库
  $con = mysqli_connect(HOST,USERNAME,PASSWORD,'model',PORT);
  if(!$con){
    echo mysqli_error($con);
  } 
  
  //选库
  /*$db = mysqli_select_db($con,'xyaPtEewCqJcvWdIoRQc');
  if(!$db){
    echo mysqli_error($con);
  }*/
  //字符集
  mysqli_query($con,'set names utf8');
?>