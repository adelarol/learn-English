// 单设备多用户支持 - 通过 URL 参数 ?user=xxx 区分
// 使用方法：在每个页面 <head> 或 <body> 顶部引入 <script src="user.js"></script>

(function() {
    // 获取当前用户，默认为 default
    function getCurrentUser() {
        const params = new URLSearchParams(location.search);
        return params.get('user') || 'default';
    }

    // 生成带用户前缀的 key
    function getUserKey(baseKey) {
        const user = getCurrentUser();
        return user === 'default' ? baseKey : `${baseKey}_${user}`;
    }

    // 保存原始 localStorage 方法
    const originalSetItem = localStorage.setItem;
    const originalGetItem = localStorage.getItem;
    const originalRemoveItem = localStorage.removeItem;
    const originalClear = localStorage.clear;

    // 重写 localStorage.setItem
    localStorage.setItem = function(key, value) {
        originalSetItem.call(this, getUserKey(key), value);
    };

    // 重写 localStorage.getItem
    localStorage.getItem = function(key) {
        return originalGetItem.call(this, getUserKey(key));
    };

    // 重写 localStorage.removeItem
    localStorage.removeItem = function(key) {
        originalRemoveItem.call(this, getUserKey(key));
    };

    // 重写 localStorage.clear（只清当前用户数据）
    localStorage.clear = function() {
        const user = getCurrentUser();
        if (user === 'default') {
            originalClear.call(this);
        } else {
            // 只删除当前用户的 keys
            const prefix = `_${user}`;
            const keysToRemove = [];
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key && key.endsWith(prefix)) {
                    keysToRemove.push(key);
                }
            }
            keysToRemove.forEach(k => originalRemoveItem.call(this, k));
        }
    };

    // 暴露获取当前用户的方法
    window.getCurrentUser = getCurrentUser;

    // 页面加载后，给所有站内 .html 链接自动追加 user 参数，保持用户身份跨页面
    document.addEventListener('DOMContentLoaded', function() {
        const user = getCurrentUser();
        if (user === 'default') return; // 默认用户无需加参数

        document.querySelectorAll('a[href]').forEach(function(a) {
            const href = a.getAttribute('href');
            // 只处理站内 .html 链接（排除 http 外链、# 锚点、javascript:）
            if (href && href.indexOf('.html') !== -1 && href.indexOf('http') !== 0) {
                // 已有参数用 & 拼接，否则用 ?
                const sep = href.indexOf('?') !== -1 ? '&' : '?';
                // 避免重复添加
                if (href.indexOf('user=') === -1) {
                    a.setAttribute('href', href + sep + 'user=' + encodeURIComponent(user));
                }
            }
        });
    });
})();
