<?php

require "conn.php";
//后端获取前端的手机号和数据库进行匹配。
if(isset($_POST['tel'])){
    $tel=$_POST['tel'];
    $result=$conn->query("select * from reg where tel='$tel'");
    if($result->fetch_assoc()){
        echo true;
    }else{
        echo false;
    }
}

//根据form内部name值获取前端表单提交的值

if(isset($_POST['submit'])){
    $name=$_POST['username'];
    $email=$_POST['email'];
    $password=sha1($_POST['password']);    
    $tel=$_POST['tel'];
    $conn->query("insert reg values('$name','$email','$password','$tel')");
    header('location:http://10.31.158.49/kaolaxianmu/src/login.html');
}