const { app, BrowserWindow } = require('electron');
const { is, setContentSecurityPolicy } = require('electron-util');
const config = require('./config');

// 가비지 콜렉션을 피하기 위해, 윈도우를 변수로 선언
let window;

// 브라우저 윈도우 세부 사항 설정
function createWindow() {
    window = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: false
        }
    });

    // URL 불러오기
    if (is.development) {
        window.loadURL(config.LOCAL_WEB_URL);
    } else {
        window.loadURL(confi.PRODUCTION_WEB_URL);
    }

    // 개발자 모드라면 브라우저 개발자 도구 열기
    if (is.development) {
        window.webContents.openDevTools();
    }

    // 프로덕션 모드에서 CSP 설정
    if (!is.development) {
        setContentSecurityPolicy(`
            default-src 'none';
            script-src 'self';
            img-src 'self' https://www.gravatar.com'
            style-src 'self';
            connect-src 'self' ${config.PRODUCTION_API_URL};
            base-uri 'none';
            form-action 'none';
            frame-ancestors 'none';
        `);
    }

    // 윈도우가 닫히면 윈도우 객체 초기화
    window.on('closed', () => {
        window = null;
    });
}

// 일렉트론이 준비되면 애플리케이션 윈도우 생성
app.on('ready', createWindow);

// 모든 윈도우가 닫혀 있으면 나가기
app.on('window-all-closed', () => {
    // 맥 OS의 경우 사용자가 명시적으로 애플리케이션을 나가면 종료
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // 맥 OS의 경우 독(dock)에서 아이콘을 클릭하면 윈도우 재생성
    if (window === null) {
        createWindow();
    }
});
