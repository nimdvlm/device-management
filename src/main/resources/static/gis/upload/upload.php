<?php 
  header('Content-type:text/html;charset=UTF-8');
  require_once("connect.php");
  echo "Upload: " . $_FILES["file"]["name"] . "<br />";
  echo "Type: " . $_FILES["file"]["type"] . "<br />";
  echo "Size: " . ($_FILES["file"]["size"] / 1024) . " Kb<br />";
  echo "Temp file: " . $_FILES["file"]["name"] . "<br />";



  if (file_exists("upload/" . $_FILES["file"]["name"])){
    
    echo $_FILES["file"]["name"] . " already exists. ";
  }
  else{
     $ok = move_uploaded_file($_FILES["file"]["tmp_name"],"upload/" . $_FILES["file"]["name"]);
    if($ok){
      $name = $_POST['modelname'];
      
      
      $url = "upload/" . $_FILES["file"]["name"];

      $sql = "insert into model(name,url) values('$name','$url')";

      if(mysqli_query($con,$sql)){
        echo "Stored in: " . "upload/" . $_FILES["file"]["name"];
      }
    }
    
  }
 
  
 
?>