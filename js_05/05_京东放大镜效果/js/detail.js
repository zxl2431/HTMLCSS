window.addEventListener('load', function () { 
    console.log('页面已经加载');
    let preview_img = document.querySelector('.preview_img');
    let mask = document.querySelector('.mask');
    let big = document.querySelector('.big');

    // 1.当我们鼠标经过的preview_img的时候就显示和隐藏 mask 遮罩层 和big大盒子
    preview_img.addEventListener('mouseover', function () { 
        mask.style.display = 'block';
        big.style.display = 'block';
    })

    preview_img.addEventListener('mouseout', function () { 
        mask.style.display = 'none';
        big.style.display = 'none';
    })

    // 2.鼠标移动的时候, 让黄色的盒子跟着鼠标走
    preview_img.addEventListener('mousemove', function (e) { 
        // 2.1 先计算出鼠标在盒子内的坐标
        var x = e.pageX - this.offsetLeft;
        var y = e.pageY - this.offsetTop;
        console.log("鼠标的坐标:", x + "---" + y);
        // 2.2 减去盒子高度 300的一半就150 就是我们mask最终left 和 top值了
        // mask的移动距离
        let maskX = x - mask.offsetWidth / 2;
        let maskY = y - mask.offsetHeight / 2;
        // 2.3 如果x 坐标小于0 不动
        // 遮挡层的最大移动距离
        var maskMax = preview_img.offsetWidth - mask.offsetWidth;
        
        if (maskX <= 0) {
            maskX = 0;
        } else if (maskX >= maskMax) { 
            maskX = maskMax;
        }

        if (maskY <= 0) {
            maskY = 0;
        } else if (maskY >= maskMax) { 
            maskY = maskMax;
        }

        mask.style.left = maskX + 'px';
        mask.style.top = maskY + 'px';

        // 3.大图片的移动距离 = 遮挡层移动距离 * 大图片最大移动距离 / 遮挡层最大移动距离
        let bigImg = document.querySelector('.bigImg');
        console.log(bigImg);
        // 大图的最大移动距离
        let bigMax = bigImg.offsetWidth - big.offsetWidth;
        // 大图的移动距离 x y 
        var bigX = maskX * bigMax / maskMax;
        var bigY = maskY * bigMax / maskMax;
        bigImg.style.left = -bigX + 'px';
        bigImg.style.top = -bigY + 'px';



    })



})