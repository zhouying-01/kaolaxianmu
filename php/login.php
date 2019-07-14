<?php

require "conn.php";
//后端获取前端的手机号和数据库进行匹配。
if(isset($_POST['name']) && isset($_POST['password'])){
    $name=$_POST['name'];
    $password=sha1($_POST['password']);
    $result=$conn->query("select * from reg where name='$name' and password='$password'");
    if($result->fetch_assoc()){
        echo true;
    }else{
        echo false;
    }
}