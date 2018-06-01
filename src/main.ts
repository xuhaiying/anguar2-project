import './polyfills.ts'; // 导入一些必要的库，确保angular能在老版本的浏览器中运行
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'; // 告诉angular用哪个模块启动应用
import { enableProdMode } from '@angular/core'; // 关闭angular的开发者模式
import { environment } from './environments/environment'; // 导入环境配置
import { AppModule } from './app/app.module'; // APP应用的主模块
import { hmrBootstrap } from './hmr';

if (environment.production) { // 如果是生产环境则关闭angular开发者模式
  enableProdMode();
}

const bootstrap = () => {
  return platformBrowserDynamic().bootstrapModule(AppModule);
}

if (environment.hmr) {
  if (module['hot']) {
    hmrBootstrap(module, bootstrap);
  } else {
    // 未加上 --hmr 时，控制台会有错误提醒
    console.error('HMR没有启用，确保 ng server 命令加上 --hmr 标记');
  }
} else {
  bootstrap();
}
