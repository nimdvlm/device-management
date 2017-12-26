<?php 
  header('Content-type:text/html;charset=UTF-8');
  require_once("connect.php");

  $query = mysqli_query($con,"select * from model");
  $arr = array(); 
  while($data = mysqli_fetch_assoc($query)){
    $name = $data['name'];
    $url = $data['url'];
    $arr[$name] = $url;
  } 
  
  //$json = json_encode($arr,JSON_UNESCAPED_UNICODE);
  //echo $arr;
  $json = json_encode($arr);
  echo $json;
  
?>