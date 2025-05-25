// 页面加载时渐显效果
document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.error-container');
    container.style.opacity = 0;
    container.style.transform = 'translateY(-20px)';
    
    // 缓动动画
    setTimeout(() => {
        container.style.opacity = 1;
        container.style.transform = 'translateY(0)';
    }, 100);
});