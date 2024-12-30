document.addEventListener('DOMContentLoaded', () => {
  const dragOverlay = document.getElementById('dragOverlay');
  const uploadButton = document.querySelector('.upload-button');
  
  // 防止浏览器默认行为
  const preventDefault = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  
  // 显示拖拽覆盖层
  const showOverlay = () => {
    dragOverlay.classList.add('active');
  };
  
  // 隐藏拖拽覆盖层
  const hideOverlay = () => {
    dragOverlay.classList.remove('active');
  };
  
  // 处理文件上传
  const handleUpload = async (files) => {
    try {
      const formData = new FormData();
      Array.from(files).forEach(file => {
        formData.append('files', file);
      });
      
      // 这里添加你的上传逻辑
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      
      if (response.ok) {
        // 显示成功提示
        showSuccessMessage('文件上传成功！');
      }
    } catch (error) {
      console.error('上传失败:', error);
      showErrorMessage('上传失败，请重试');
    }
  };
  
  // 绑定拖拽事件
  document.addEventListener('dragenter', (e) => {
    preventDefault(e);
    showOverlay();
  });
  
  document.addEventListener('dragover', preventDefault);
  
  document.addEventListener('dragleave', (e) => {
    preventDefault(e);
    if (e.relatedTarget === null) {
      hideOverlay();
    }
  });
  
  document.addEventListener('drop', (e) => {
    preventDefault(e);
    hideOverlay();
    handleUpload(e.dataTransfer.files);
  });
  
  // 点击上传按钮
  uploadButton.addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.accept = '.pdf,.doc,.docx,.xls,.xlsx';
    
    input.onchange = (e) => {
      handleUpload(e.target.files);
    };
    
    input.click();
  });
});

// 提示消息组件
function showSuccessMessage(message) {
  const toast = document.createElement('div');
  toast.className = 'toast success fade-up';
  toast.textContent = message;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.remove();
  }, 3000);
}

function showErrorMessage(message) {
  const toast = document.createElement('div');
  toast.className = 'toast error fade-up';
  toast.textContent = message;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.remove();
  }, 3000);
}