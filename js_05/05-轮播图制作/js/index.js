window.addEventListener('load', function () { 
    // 1.获取元素
    let arrow_l = document.querySelector('.arrow-l');
    let arrow_r = document.querySelector('.arrow-r');
    let focus = document.querySelector('.focus');

    let focusWidth = focus.offsetWidth;
    console.log(focusWidth);

    // 鼠标经过focus就显示隐藏左右按钮
    focus.addEventListener('mouseenter', function () { 
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer);
        timer = null;
    })

    focus.addEventListener('mouseleave', function () {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        timer = setInterval(function () {
            // 手动调用点击事件
            arrow_r.click();
            // console.log("------");
        }, 2000);
    });

    //3.动态生成小圆圈, 有几张图就生成几个小圆圈
    let ul = focus.querySelector('ul');
    let ol = focus.querySelector('.circle');

    
    for (let i = 0; i < ul.children.length; i++) { 
        // 创建一个小li 
        let li = document.createElement('li');
        li.setAttribute('index', i);
        // 把小li插入ol里面
        ol.appendChild(li);
        // 4.小圆圈的排他思想, 我们可以直接在生成小圆圈的同时直接绑定点击事件
        li.addEventListener('click', function () { 
            //干掉所有人 把所有小li清除current类名
            for (var i = 0; i < ol.children.length; i++) { 
                ol.children[i].className = '';
            }
            //留下我自己, 当前小li 设置current类名
            this.className = 'current';
            // 5. 点击小圆圈, 移动图片, 当然移动的是ul
            // ul 移动的距离 小圆圈的索引号 乘以 图片的宽度 注意是负值
            let index = this.getAttribute('index');
            num = index;
            circle = index;

            animate(ul, -index * focusWidth);

        })
    }

    // 把ol里面的第一个小li设置类名为 current
    ol.children[0].className = 'current';
    
    // 6.克隆第一张图片li放到ul 最后面
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);

    //7.点击右侧按钮, 图片滚动一张
    let num = 0;

    // circle 控制小圆圈的播放
    let circle = 0;
    // flag 节流阀
    var flag = true;
    arrow_r.addEventListener('click', function () { 
        if (flag) { 
            flag = false;
            if (num == ul.children.length - 1) { 
                ul.style.left = 0;
                num = 0;
            }
            num++;
            
            animate(ul, -num * focusWidth, function () { 
                flag = true;
            })
            
            //8.点击右侧, 小圆圈跟随一起变化 可以在声明一个变量控制小圆圈的播放
            circle++; 
            // 如果circle==4 说明走到最后克隆的这张图片了 复原
            if (circle == ol.children.length) { 
                circle = 0;
            }
            // 调用函数
            circleChange();
        }
    })

    // 9.左侧按钮做法
    arrow_l.addEventListener('click', function () { 
        if (flag) {
            flag = false;
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * focusWidth + 'px';

            }
            num--;
            animate(ul, -num * focusWidth, function() {
                flag = true;
            });
            // 点击左侧按钮，小圆圈跟随一起变化 可以再声明一个变量控制小圆圈的播放
            circle--;
            // 如果circle < 0  说明第一张图片，则小圆圈要改为第4个小圆圈（3）
            // if (circle < 0) {
            //     circle = ol.children.length - 1;
            // }
            circle = circle < 0 ? ol.children.length - 1 : circle;
            // 调用函数
            circleChange();
        }
    })



    function circleChange() { 
        // 先清除其余小圆圈的current类名
        for (var i = 0; i < ol.children.length; i++) { 
            ol.children[i].className = '';
        }

        // 留下当前小圆圈的current类名
        ol.children[circle].className = 'current';
    }

    // 10.自动播放轮播图
    let timer = this.setInterval(function () { 
        arrow_r.click();
    }, 2000)



})