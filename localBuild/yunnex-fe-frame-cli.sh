#!/bin/bash
root=""
function gen_child_project {
    local src;
    read -p "请输入要创建的子项目的名称:" project_name;
    if [ -e "$project_name" ]; then
        echo "子项目$project_name已经存在!";
    else
        src=$root/$project_name/src;
        echo "=>正在生成$src目录...";
        mkdir -p $src;
        dir_arr=("js" "styles" "page-vues" "images" "html" "images/icons");
        for item in ${dir_arr[@]}; do
            echo "=>正在生成$item目录...";
            mkdir -p $src/$item;
        done
        if [[ $? == 0 ]]; then
            echo "生成子项目$project_name成功!";
            init;
        else
            echo "生成失败!";
        fi
    fi
}

function init {
    if [ -z $root ];then
        read -p "请输入项目根目录路径:" root_name;
        if [ ! -e $root_name ]; then
            echo "$root_name目录不存在";
            exit;
        fi
    fi

    root="$root_name";
    echo "====================="
    echo "0、退出程序"
    echo "1、创建子项目"
    echo "2、创建html文件(会为您自动生成对应的js、vue文件)"
    echo "====================="
    read -p "请输入你要执行的操作:" c;
    if [ "$c" == "1" ]; then
        gen_child_project;
    elif [ "$c" == "2" ]; then
        gen_html_file;
    elif [ "$c" == "0" ]; then
        exit;
    else
        echo "输入的指令不合法,请重新输入!";
        clear;
        init;
    fi
}

function gen_html_file {
    local p_name;
    local m_name;
    local file_name;
    local tip="输入0退出!";

    read -p "请输入html文件所在的子项目名称,$tip:" project_name;
    if [ -z ${project_name// /} ]; then
        echo "输入的数据不合法,请重新输入!";
        read project_name;
    elif [ "$project_name" == "0" ]; then
        exit
    else
        p_name=$project_name;
    fi

    read -p "请输入html文件所在的子模块名称,$tip:" module_name;
    if [ -z ${module_name// /} ]; then
        echo "输入的数据不合法,请重新输入!";
        read module_name;
    elif [ "$module_name" == "0" ]; then
        exit
    else
        m_name=$module_name;
    fi

    read -p "请输入html文件名称,多个名称之间用一个空格隔开,$tip:" name;
    if [ -z ${name// /} ]; then
        echo "输入的数据不合法,请重新输入!";
        read name;
    elif [ "$name" == "0" ]; then
        exit
    else
        file_name=($name);
    fi

    for item in ${file_name[@]}; do
        if [ ! -e "$root/$p_name/src/html/$m_name" ]; then
            mkdir -p $root/$p_name/src/html/$m_name;
        fi
        
        if [ ! -e "$root/$p_name/src/js/$m_name" ]; then
            mkdir -p $root/$p_name/src/js/$m_name;
        fi

        if [ ! -e "$root/$p_name/src/page-vues/$m_name" ]; then
            mkdir -p $root/$p_name/src/page-vues/$m_name;
        fi

        gen_html "$root/$p_name/src/html/$m_name/$item";
        gen_js "$root/$p_name/src/js/$m_name/$item";
        gen_vue "$root/$p_name/src/page-vues/$m_name/$item";
    done

    if [ $? == 0 ]; then
        echo "执行成功!";
    else
        echo "执行失败!";
    fi

    init
}

function gen_html {
    local name=$1
    local title=$2
    local template=" \
<!DOCTYPE html>
<html lang=\"en\">
    <head>
        <meta charset=\"UTF-8\">
        <title>$title</title>
    </head>
    <body>
        <div id=\"app\">
            <app></app>
        </div>
    </body>
</html>
    "

    echo "$template">$name.html
    if [ $? == 0 ]; then
        echo "生成$name.html文件成功!";
    else
        echo "生成$name.html文件失败!";
        return 1;
    fi
}

function gen_js {
    local name=$1
    local template=" \
var Vue = require('libs/vue'),
    page = require('../../page-vues/${name##*js/}');

new Vue({
    el: '#app',
    components: {
        app: page
    }
});
    "
    echo "$template">$name.js
    if [ $? == 0 ]; then
        echo "生成$name.js文件成功!";
    else
        echo "生成$name.js文件失败!";
        return 1;
    fi

}

function gen_vue {
    local name=$1
    local template=" \
<template>
    <div class=\"page-${name##*/} page-padding\">
    
    </div>
</template>

<style lang=\"scss\">
    .page-${name##*/} {
        
    }
</style>

<script>
    var commCss = require('common/styles/common.scss');

    module.exports = {
        data: function() {
            return {
                
            };  
        },
        methods: {
            
        },
        components: {
            
        }
    };
</script>"

    echo "${template}">$name.vue
    if [ $? == 0 ]; then
        echo "生成$name.vue文件成功!";
    else
        echo "生成$name.vue文件失败!";
        return 1;
    fi

}

init
