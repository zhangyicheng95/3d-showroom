import arrow from '@/assets/texture/arrow.png';
import chinaMap from '@/assets/texture/chinaMap.png';
import flyLine from '@/assets/texture/flyLine2.png';
import gaoguang1 from '@/assets/texture/gaoguang1.png';
import grid from '@/assets/texture/grid.png';
import gridBlack from '@/assets/texture/gridBlack.png';
import guangquan1 from '@/assets/texture/guangquan01.png';
import guangquan2 from '@/assets/texture/guangquan02.png';
import huiguang from '@/assets/texture/huiguang.png';
import pathLine from '@/assets/texture/pathLine2.png';
import pathLine2 from '@/assets/texture/pathLine4.png';
import point from '@/assets/texture/point1.png';
import quan from '@/assets/texture/quan.png';
import rotationBorder1 from '@/assets/texture/rotationBorder1.png';
import rotationBorder2 from '@/assets/texture/rotationBorder3.png';
import side from '@/assets/texture/side2.png';
import topNormal from '@/assets/texture/topNormal.jpg';
import topNormal4 from '@/assets/texture/topNormal4.png';
import { FileLoader } from 'three';
import { Resource } from '../mini3d';

export class Assets {
  constructor(onLoadCallback = null) {
    this.onLoadCallback = onLoadCallback;
    this.init();
  }
  init() {
    this.instance = new Resource();
    // 添加Fileloader
    this.instance.addLoader(FileLoader, 'FileLoader');
    // 资源加载进度
    this.instance.on('onProgress', (path, itemsLoaded, itemsTotal) => {
      let progress = (itemsLoaded / itemsTotal) * 100;
      let bfb = progress.toFixed(2) + '%!';
      // console.log(bfb, path, itemsLoaded, itemsTotal)
    });
    // 资源加载完成事件
    this.instance.on('onLoad', () => {
      // console.log("资源加载完成")
      this.onLoadCallback && this.onLoadCallback();
    });
    // 资源加载
    let base_url = 'json/';
    let assets = [
      { type: 'Texture', name: 'grid', path: grid },
      { type: 'Texture', name: 'pathLine', path: pathLine2 },
      { type: 'Texture', name: 'pathLine2', path: pathLine },
      { type: 'Texture', name: 'flyLine', path: flyLine },
      { type: 'Texture', name: 'arrow', path: arrow },
      { type: 'Texture', name: 'gridBlack', path: gridBlack },
      { type: 'Texture', name: 'quan', path: quan },
      { type: 'Texture', name: 'gaoguang1', path: gaoguang1 },
      { type: 'Texture', name: 'huiguang', path: huiguang },
      { type: 'Texture', name: 'rotationBorder1', path: rotationBorder1 },
      { type: 'Texture', name: 'rotationBorder2', path: rotationBorder2 },
      { type: 'Texture', name: 'guangquan1', path: guangquan1 },
      { type: 'Texture', name: 'guangquan2', path: guangquan2 },
      { type: 'Texture', name: 'side', path: side },
      { type: 'Texture', name: 'chinaMap', path: chinaMap },
      { type: 'Texture', name: 'topNormal', path: topNormal },
      { type: 'Texture', name: 'topNormal4', path: topNormal4 },
      { type: 'Texture', name: 'point', path: point },
      {
        type: 'File',
        name: 'chinaStorke',
        path: '/json/中华人民共和国-轮廓.json',
      },
      {
        type: 'File',
        name: 'china',
        path: '/json/中华人民共和国.json',
      },
      {
        type: 'File',
        name: 'transportPath',
        path: '/json/运输路径.json',
      },
    ];
    // 资源加载
    this.instance.loadAll(assets);
  }
}
