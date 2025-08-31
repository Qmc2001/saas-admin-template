document.addEventListener('DOMContentLoaded', function() {
    // Lấy các phần tử DOM
    const dom = {
        layout: document.getElementById('layout'),
        title: document.getElementById('title'),
        description: document.getElementById('description'),
        organization: document.getElementById('organization'),
        organizationColor: document.getElementById('organizationColor'),
        patternColor: document.getElementById('patternColor'),
        logoUpload: document.getElementById('logoUpload'),
        logoFileName: document.getElementById('logoFileName'),
        textColor: document.getElementById('textColor'),
        fontFamily: document.getElementById('fontFamily'),
        titleFontSize: document.getElementById('titleFontSize'),
        titleFontSizeValue: document.getElementById('titleFontSizeValue'),
        descFontSize: document.getElementById('descFontSize'),
        descFontSizeValue: document.getElementById('descFontSizeValue'),
        textShadow: document.getElementById('textShadow'),
        ratio: document.getElementById('ratio'),
        
        bgType: document.getElementById('bgType'),
        solidColorControl: document.getElementById('solidColorControl'),
        gradientColorControl: document.getElementById('gradientColorControl'),
        imageControl: document.getElementById('imageControl'),
        bgColor: document.getElementById('bgColor'),
        gradientColor1: document.getElementById('gradientColor1'),
        gradientColor2: document.getElementById('gradientColor2'),
        bgImageUpload: document.getElementById('bgImageUpload'),
        bgImageFileName: document.getElementById('bgImageFileName'),
        
        thumbnailPreview: document.getElementById('thumbnailPreview'),
        thumbnailContent: document.getElementById('thumbnailContent'),
        previewTitle: document.getElementById('previewTitle'),
        previewDescription: document.getElementById('previewDescription'),
        previewOrganization: document.getElementById('previewOrganization'),
        previewLogo: document.getElementById('previewLogo'),

        resetBtn: document.getElementById('resetBtn'),
        exportBtn: document.getElementById('exportBtn'),
        exportModal: document.getElementById('exportModal'),
        closeModal: document.getElementById('closeModal'),
        cancelExport: document.getElementById('cancelExport'),
        downloadThumbnail: document.getElementById('downloadThumbnail'),
        filename: document.getElementById('filename'),
        resolution: document.getElementById('resolution'),
        fileformat: document.getElementById('fileformat'),

        themeToggle: document.getElementById('themeToggle'),
        footerThemeToggle: document.getElementById('footerThemeToggle')
    };
    
    const defaultValues = {
        title: '10 Things I Learned While Doing Nothing',
        description: 'A fun list of lessons from doing absolutely nothing.',
        organization: 'My Company',
        organizationColor: '#4361ee',
        patternColor: '#e6eafb',
        bgColor: '#f0f7ff',
        textColor: '#2b2d42',
        gradientColor1: '#4361ee',
        gradientColor2: '#f72585',
        fontFamily: 'DM Sans, sans-serif',
        ratio: '16/9',
        layout: 'layout-default',
        titleFontSize: '5',
        descFontSize: '3',
        textShadow: true
    };

    // Cập nhật xem trước
    function updateText() {
        dom.previewTitle.textContent = dom.title.value;
        dom.previewDescription.textContent = dom.description.value;
        dom.previewOrganization.textContent = dom.organization.value;
        dom.previewOrganization.style.color = dom.organizationColor.value;
    }

    function updateStyling() {
        const containerWidth = dom.thumbnailContent.offsetWidth;

        dom.thumbnailContent.style.color = dom.textColor.value;
        dom.thumbnailContent.style.fontFamily = dom.fontFamily.value;
        
        dom.thumbnailContent.style.setProperty('--pattern-color', dom.patternColor.value);

        dom.previewTitle.style.fontSize = `calc(${containerWidth}px * ${dom.titleFontSize.value} / 100)`;
        dom.previewDescription.style.fontSize = `calc(${containerWidth}px * ${dom.descFontSize.value} / 100)`;

        const shadowStyle = dom.textShadow.checked ? '2px 2px 8px rgba(0,0,0,0.3)' : 'none';
        dom.previewTitle.style.textShadow = shadowStyle;
        dom.previewDescription.style.textShadow = shadowStyle;
    }

    function updateBackground() {
        dom.solidColorControl.style.display = 'none';
        dom.gradientColorControl.style.display = 'none';
        dom.imageControl.style.display = 'none';
        dom.thumbnailContent.style.backgroundImage = 'none';
        dom.thumbnailContent.style.backgroundColor = 'transparent';

        switch (dom.bgType.value) {
            case 'solid':
                dom.solidColorControl.style.display = 'block';
                dom.thumbnailContent.style.backgroundColor = dom.bgColor.value;
                break;
            case 'gradient':
                dom.gradientColorControl.style.display = 'flex';
                dom.thumbnailContent.style.background = `linear-gradient(135deg, ${dom.gradientColor1.value}, ${dom.gradientColor2.value})`;
                break;
            case 'image':
                dom.imageControl.style.display = 'block';
                break;
        }
    }
    
    function updateLayout() {
        dom.thumbnailContent.className = 'thumbnail-content';
        dom.thumbnailContent.classList.add(dom.layout.value);
        updateStyling();
    }

    function applyRatio() {
        dom.thumbnailPreview.style.aspectRatio = dom.ratio.value;
        updateStyling();
    }
    
    function updateFilename() {
        const resolution = dom.resolution.value;
        const now = new Date();
        const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '');
        dom.filename.value = `thumbnail-${resolution}-${dateStr}`;
    }
    
    function updateAll() {
        updateText();
        updateBackground();
        updateLayout();
        applyRatio();
        updateFilename();
    }

    // Xử lý sự kiện
    const controlsToUpdate = [
        dom.layout, dom.title, dom.description, dom.organization, 
        dom.organizationColor, dom.patternColor, dom.textColor, dom.fontFamily, 
        dom.ratio, dom.bgType, dom.bgColor, dom.gradientColor1, dom.gradientColor2, 
        dom.textShadow
    ];
    controlsToUpdate.forEach(control => {
        const eventType = (control.type === 'text' || control.type === 'textarea' || control.type === 'color') ? 'input' : 'change';
        control.addEventListener(eventType, updateAll);
    });
    
    dom.titleFontSize.addEventListener('input', () => {
        dom.titleFontSizeValue.textContent = dom.titleFontSize.value;
        updateStyling();
    });
    dom.descFontSize.addEventListener('input', () => {
        dom.descFontSizeValue.textContent = dom.descFontSize.value;
        updateStyling();
    });

    function handleFileUpload(inputElement, fileNameElement, callback) {
        inputElement.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                fileNameElement.textContent = file.name;
                const reader = new FileReader();
                reader.onload = (event) => callback(event.target.result);
                reader.readAsDataURL(file);
            } else {
                fileNameElement.textContent = 'Chưa chọn tệp nào';
                callback(null);
            }
        });
    }

    handleFileUpload(dom.logoUpload, dom.logoFileName, (result) => {
        if (result) {
            dom.previewLogo.innerHTML = `<img src="${result}" alt="Logo">`;
        } else {
            dom.previewLogo.innerHTML = 'MC';
        }
    });
    
    handleFileUpload(dom.bgImageUpload, dom.bgImageFileName, (result) => {
        if (result) {
            dom.thumbnailContent.style.backgroundImage = `url(${result})`;
        } else {
            dom.thumbnailContent.style.backgroundImage = 'none';
        }
    });

    dom.resetBtn.addEventListener('click', () => {
        dom.title.value = defaultValues.title;
        dom.description.value = defaultValues.description;
        dom.organization.value = defaultValues.organization;
        dom.organizationColor.value = defaultValues.organizationColor;
        dom.patternColor.value = defaultValues.patternColor;
        dom.bgColor.value = defaultValues.bgColor;
        dom.textColor.value = defaultValues.textColor;
        dom.gradientColor1.value = defaultValues.gradientColor1;
        dom.gradientColor2.value = defaultValues.gradientColor2;
        dom.fontFamily.value = defaultValues.fontFamily;
        dom.ratio.value = defaultValues.ratio;
        dom.layout.value = defaultValues.layout;
        dom.titleFontSize.value = defaultValues.titleFontSize;
        dom.descFontSize.value = defaultValues.descFontSize;
        dom.textShadow.checked = defaultValues.textShadow;
        
        dom.logoFileName.textContent = 'Chưa chọn tệp nào';
        dom.previewLogo.innerHTML = 'MC';
        dom.logoUpload.value = '';

        dom.bgImageFileName.textContent = 'Chưa chọn tệp nào';
        dom.bgImageUpload.value = '';
        dom.thumbnailContent.style.backgroundImage = 'none';

        dom.bgType.value = 'solid';

        updateAll();
    });

    dom.exportBtn.addEventListener('click', () => dom.exportModal.classList.add('active'));
    const closeExportModal = () => dom.exportModal.classList.remove('active');
    dom.closeModal.addEventListener('click', closeExportModal);
    dom.cancelExport.addEventListener('click', closeExportModal);
    dom.resolution.addEventListener('change', updateFilename);

    dom.downloadThumbnail.addEventListener('click', async () => {
        const [width, height] = dom.resolution.value.split('x').map(Number);
        const format = dom.fileformat.value;
        const originalButtonHTML = dom.downloadThumbnail.innerHTML;

        try {
            dom.downloadThumbnail.disabled = true;
            dom.downloadThumbnail.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang xử lý...';

            const previewElement = dom.thumbnailContent;
            const previewWidth = previewElement.offsetWidth;
            const scale = width / previewWidth;
            
            const canvas = await html2canvas(previewElement, {
                scale: scale, 
                useCORS: true, 
                logging: false,
                width: previewElement.offsetWidth, 
                height: previewElement.offsetHeight,
            });
            
            const url = canvas.toDataURL(`image/${format}`, 1.0);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${dom.filename.value}.${format}`;
            document.body.appendChild(a);
            a.click();
            
            document.body.removeChild(a);
            closeExportModal();

        } catch (error) {
            console.error('Lỗi khi tạo thumbnail:', error);
            alert('Rất tiếc, đã có lỗi xảy ra trong quá trình xuất ảnh. Vui lòng kiểm tra lại (đặc biệt là ảnh logo nếu có) hoặc thử lại.');
        } finally {
            dom.downloadThumbnail.disabled = false;
            dom.downloadThumbnail.innerHTML = originalButtonHTML;
        }
    });

    function toggleTheme() {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        const iconHTML = isDarkMode ? '<i class="fas fa-sun"></i><span>Light Mode</span>' : '<i class="fas fa-moon"></i><span>Dark Mode</span>';
        dom.themeToggle.innerHTML = iconHTML;
        dom.footerThemeToggle.innerHTML = iconHTML;
    }

    dom.themeToggle.addEventListener('click', toggleTheme);
    dom.footerThemeToggle.addEventListener('click', toggleTheme);

    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        const iconHTML = '<i class="fas fa-sun"></i><span>Light Mode</span>';
        dom.themeToggle.innerHTML = iconHTML;
        dom.footerThemeToggle.innerHTML = iconHTML;
    }
    
    new ResizeObserver(updateStyling).observe(dom.thumbnailContent);
    
    updateAll();
});
