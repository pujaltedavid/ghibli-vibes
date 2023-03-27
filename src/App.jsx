import { useEffect, useState } from 'react'
import './App.css'

const BASE_URL = 'https://www.ghibli.jp/gallery'

const MOVIES = {
  redturtle: 50,
  onyourmark: 28,
  laputa: 50,
  nausicaa: 50,
  tanuki: 50,
  umi: 50,
  porco: 50,
  majo: 50,
  totoro: 50,
  howl: 50,
  baron: 50,
  mononoke: 50,
  mimi: 50,
  marnie: 50,
  kokurikozaka: 50,
  karigurashi: 50,
  ponyo: 50,
  ged: 50,
  chihiro: 50,
}

const EXTRA = [
  'https://www.ghibli.jp/images/arietty1.jpg',
  'https://www.ghibli.jp/images/ponyo1.jpg',
  'https://www.ghibli.jp/images/howl1.jpg',
  'https://www.ghibli.jp/images/chihiro1.jpg',
  'https://www.ghibli.jp/images/laputa1.jpg',
  'https://www.ghibli.jp/images/mimi1.jpg',
  'https://www.ghibli.jp/images/marnie1.jpg',
  'https://r4.wallpaperflare.com/wallpaper/803/347/759/anime-natural-light-landscape-forest-studio-ghibli-hd-wallpaper-48365d3810f05c08a02cc19e888214ba.jpg',
  'https://r4.wallpaperflare.com/wallpaper/556/658/431/spirited-away-studio-ghibli-anime-wallpaper-6bb61c1d6321bf490554db29fd7c8c70.jpg',
  'https://r4.wallpaperflare.com/wallpaper/158/774/427/anime-studio-ghibli-spirited-away-wallpaper-162f03a594ef91dbe5dab6d1f985995d.jpg',
  'https://r4.wallpaperflare.com/wallpaper/821/769/300/spirited-away-studio-ghibli-anime-wallpaper-b1d3631b15000fc9473b158c68cb2742.jpg',
  'https://r4.wallpaperflare.com/wallpaper/837/14/455/studio-ghibli-spirited-away-anime-girls-anime-wallpaper-3dccbc06a83e4b955efa534c4e3ae5ed.jpg',
  'https://r4.wallpaperflare.com/wallpaper/154/582/493/anime-studio-ghibli-kurenai-no-buta-wallpaper-6b26dc7da3e10f2965146be97d4c7c90.jpg',
  'https://r4.wallpaperflare.com/wallpaper/704/384/835/studio-ghibli-howl-s-moving-castle-anime-wallpaper-692a4e7b587684384eb4ffcd2f78b8e0.jpg',
  'https://r4.wallpaperflare.com/wallpaper/13/629/235/anime-studio-ghibli-karigurashi-no-arrietty-house-wallpaper-b5a413e2181f4fe3dab253b3031d8aa7.jpg',
  'https://r4.wallpaperflare.com/wallpaper/45/141/247/studio-ghibli-spirited-away-chihiro-hayao-miyazaki-wallpaper-1355d76125cd799174055a83effbc327.jpg',
  'https://r4.wallpaperflare.com/wallpaper/540/125/295/anime-studio-ghibli-landscape-house-wallpaper-c900e86d11fa9dab9607981fd031862d.jpg',
  'https://r4.wallpaperflare.com/wallpaper/637/357/144/anime-studio-ghibli-howl-s-moving-castle-wallpaper-488aceca49ebf229da4359279d161cef.jpg',
  'https://r4.wallpaperflare.com/wallpaper/28/987/741/chihiro-anime-hayao-miyazaki-spirited-away-wallpaper-2dfcac86981ecb65becab3bc3eda85bd.jpg',
  'https://r4.wallpaperflare.com/wallpaper/433/871/768/studio-ghibli-kiki-s-delivery-service-anime-anime-girls-wallpaper-fc9612bd2c66ce9b51502f05cfff4d5b.jpg',
  'https://r4.wallpaperflare.com/wallpaper/531/850/331/spirited-away-studio-ghibli-anime-wallpaper-38195760bf1b00fa2539b6fdd051140a.jpg',
  'https://r4.wallpaperflare.com/wallpaper/225/913/161/studio-ghibli-spirited-away-anime-movies-wallpaper-29c078fdc12abd8b2667b8df90a116bd.jpg',
  'https://r4.wallpaperflare.com/wallpaper/826/47/788/studio-ghibli-hayao-miyazaki-wallpaper-59ebafec53537769d157f02a7148113c.jpg',
  'https://r4.wallpaperflare.com/wallpaper/433/770/366/studio-ghibli-anime-hauru-no-ugoku-shiro-howl-s-moving-castle-wallpaper-2b665cedc3616fd9f5740b391d9c2c80.jpg',
  'https://r4.wallpaperflare.com/wallpaper/357/54/461/my-neighbor-totoro-totoro-rain-outdoors-anime-hd-wallpaper-592b3f5c0393c789d137807a0188611c.jpg',
  'https://r4.wallpaperflare.com/wallpaper/637/672/938/spirited-away-hayao-miyazaki-studio-ghibli-anime-hd-wallpaper-bd0c72484e1759ff5bca0f7002720760.jpg',
  'https://r4.wallpaperflare.com/wallpaper/212/796/947/spirited-away-studio-ghibli-anime-wallpaper-10595db56c78f92299175199da5fc5dc.jpg',
  'https://r4.wallpaperflare.com/wallpaper/30/207/789/studio-ghibli-spirited-away-anime-manga-wallpaper-a9e0287d919aad0b46a728ef10d166cd.jpg',
  'https://r4.wallpaperflare.com/wallpaper/790/683/693/anime-studio-ghibli-hauru-no-ugoku-shiro-howl-s-moving-castle-wallpaper-1b169c7db3f11fc915b4bb29bd3c5ce0.jpg',
  'https://r4.wallpaperflare.com/wallpaper/788/511/664/studio-ghibli-anime-majo-no-takky%C5%ABbin-kiki-s-delivery-service-wallpaper-1c763608dbb812dffeafcdc6a6297bfa.jpg',
  'https://r4.wallpaperflare.com/wallpaper/31/143/667/howl-s-moving-castle-hauru-no-ugoku-shiro-studio-ghibli-hd-wallpaper-e896ad2860e0cc68e0fca1ce78a2144a.jpg',
  'https://r4.wallpaperflare.com/wallpaper/224/617/248/studio-ghibli-only-yesterday-multiple-display-artwork-wallpaper-b144fa2ae09e55d250b243b49ece306d.jpg',
  'https://r4.wallpaperflare.com/wallpaper/375/950/354/studio-ghibli-forest-green-background-trees-hd-wallpaper-e8565de8f030ac3800cc910e283254ca.jpg',
  'https://r4.wallpaperflare.com/wallpaper/177/781/246/anime-anime-girls-studio-ghibli-whisper-of-the-heart-wallpaper-69fb9f5c53c3f709e1b7f07a5168b13c.jpg',
  'https://r4.wallpaperflare.com/wallpaper/28/965/74/studio-ghibli-karigurashi-no-arrietty-multiple-display-cottage-wallpaper-61d4ba5ae0ce5542902223f44e0e90ad.jpg',
  'https://r4.wallpaperflare.com/wallpaper/560/237/180/porco-rosso-studio-ghibli-anime-wallpaper-0bc6fccd63713f098514fbf9ddfc4c00.jpg',
  'https://r4.wallpaperflare.com/wallpaper/647/728/849/studio-ghibli-anime-spirited-away-wallpaper-c93a9197b3715c12dedf6929c32a399a.jpg',
  'https://r4.wallpaperflare.com/wallpaper/70/752/1009/studio-ghibli-my-neighbor-totoro-totoro-anime-girls-wallpaper-389bafce11ecab268af020ebdf343790.jpg',
  'https://r4.wallpaperflare.com/wallpaper/975/27/769/studio-ghibli-porco-rosso-multiple-display-garden-wallpaper-11846a7a205e55f2f022c374ce3e706d.jpg',
  'https://r4.wallpaperflare.com/wallpaper/487/385/127/porco-rosso-studio-ghibli-anime-wallpaper-812f8b241a258db3371a6ceadebcd658.jpg',
  'https://r4.wallpaperflare.com/wallpaper/666/893/242/nature-sunlight-trees-sun-rays-wallpaper-2b81ff254838c68ff25b3cad50be661f.jpg',
  'https://r4.wallpaperflare.com/wallpaper/610/670/557/anime-studio-ghibli-princess-mononoke-wallpaper-b5f3c5030bf186a946dbcf429f03f748.jpg',
  'https://r4.wallpaperflare.com/wallpaper/320/119/781/studio-ghibli-anime-hauru-no-ugoku-shiro-howl-s-moving-castle-wallpaper-7bd6fc4d43a19ff9c5346bf95d6cbc50.jpg',
  'https://r4.wallpaperflare.com/wallpaper/619/548/909/fantasy-art-anime-studio-ghibli-my-neighbor-totoro-wallpaper-77807bc29744b0a38477b9305617da97.jpg',
  'https://r4.wallpaperflare.com/wallpaper/267/352/948/anime-studio-ghibli-howl-s-moving-castle-wallpaper-60157676eaeafa69e832947cc412034e.jpg',
  'https://r4.wallpaperflare.com/wallpaper/574/176/866/spirited-away-studio-ghibli-anime-wallpaper-ed5d3f5d042292ab85c4e0479066bac2.jpg',
  'https://r4.wallpaperflare.com/wallpaper/655/479/799/studio-ghibli-anime-kurenai-no-buta-porco-rosso-wallpaper-d96f489624bc8759ec9cecfcc2bad7b7.jpg',
  'https://r4.wallpaperflare.com/wallpaper/566/138/438/anime-studio-ghibli-kurenai-no-buta-wallpaper-3b96fc6d6361af69a5c41b094d4c2c90.jpg',
  'https://r4.wallpaperflare.com/wallpaper/443/482/424/studio-ghibli-forest-clearing-forest-landscape-oak-hd-wallpaper-b8e66d7830908c38504c617e28c2148a.jpg',
  'https://r4.wallpaperflare.com/wallpaper/746/823/752/studio-ghibli-anime-mimi-o-sumaseba-wallpaper-a4b5aec8fa783d488f4764b5b8c56cd9.jpg',
  'https://r4.wallpaperflare.com/wallpaper/1008/961/184/landscape-nausicaa-anime-studio-ghibli-wallpaper-2940c88dd1fa4dfb3637485fb0a1162d.jpg',
  'https://r4.wallpaperflare.com/wallpaper/721/505/104/multiple-display-dual-monitors-dock-illustration-wallpaper-31e4fa2a004ef52250f263c44eee00ed.jpg',
  'https://r4.wallpaperflare.com/wallpaper/987/988/964/studio-ghibli-anime-laputa-castle-in-the-sky-wallpaper-6bd61c2d73811f1925b41b399dbcac40.jpg',
  'https://r4.wallpaperflare.com/wallpaper/767/264/974/my-neighbor-totoro-totoro-studio-ghibli-howl-s-moving-castle-wallpaper-59db1f6c43133789515770ca818801cc.jpg',
  'https://r4.wallpaperflare.com/wallpaper/909/865/115/stairs-garden-studio-ghibli-wallpaper-29e008dda1faad1bd6c7c80f30a1460d.jpg',
  'https://r4.wallpaperflare.com/wallpaper/322/69/207/robot-studio-ghibli-anime-castle-in-the-sky-wallpaper-d9d0684d41ca5dbb664748ef2091f67d.jpg',
  'https://r4.wallpaperflare.com/wallpaper/521/672/861/studio-ghibli-spirited-away-anime-anime-girls-wallpaper-b5b8a99d68e9865d2e30c0adf7cf300d.jpg',
  'https://r4.wallpaperflare.com/wallpaper/566/830/464/anime-studio-ghibli-landscape-house-wallpaper-6b96dccd3391cfa965f4cb09ad8ccc80.jpg',
  'https://r4.wallpaperflare.com/wallpaper/594/590/427/anime-studio-ghibli-nausicaa-nausicaa-of-the-valley-of-the-wind-wallpaper-d1e3c33bc580dfc9577bb55c182bd772.jpg',
  'https://r4.wallpaperflare.com/wallpaper/237/369/237/animation-artwork-fantasy-art-howl-s-moving-castle-wallpaper-c3f4667653617056212123e16d90a968.jpg',
  'https://r4.wallpaperflare.com/wallpaper/461/406/407/studio-ghibli-anime-kurenai-no-buta-porco-rosso-wallpaper-bb165c3da3912fe945943b19ed0c4c00.jpg',
  'https://r4.wallpaperflare.com/wallpaper/105/872/847/studio-ghibli-anime-wallpaper-8535511da33cf6f547d642386ce1a332.jpg',
  'https://r4.wallpaperflare.com/wallpaper/666/437/269/anime-studio-ghibli-landscape-house-wallpaper-b173a33bb590dfa967cbf59c28cb6792.jpg',
  'https://r4.wallpaperflare.com/wallpaper/79/555/799/studio-ghibli-spirited-away-anime-anime-girls-wallpaper-0930488db15aedbbe607d8ffe001760d.jpg',
  'https://r4.wallpaperflare.com/wallpaper/151/284/853/movie-porco-rosso-anime-hotel-wallpaper-5183237b85409f09e76b858c08fb67f2.jpg',
  'https://r4.wallpaperflare.com/wallpaper/282/124/895/studio-ghibli-anime-artwork-laputa-castle-in-the-sky-wallpaper-5b165c1d53a18f494564fb59fd4c4c00.jpg',
  'https://r4.wallpaperflare.com/wallpaper/723/619/788/porco-rosso-studio-ghibli-anime-wallpaper-dc6cc9eba74ab3a2f857fd09c9235d95.jpg',
  'https://r4.wallpaperflare.com/wallpaper/327/727/759/studio-ghibli-anime-wallpaper-518fdb446ac58da3f76aac4a9edc3608.jpg',
  'https://r4.wallpaperflare.com/wallpaper/671/681/314/anime-studio-ghibli-laputa-castle-in-the-sky-wallpaper-4bb60cbdd351bfd945a4cbd94d2c2ca0.jpg',
  'https://r4.wallpaperflare.com/wallpaper/798/442/406/anime-studio-ghibli-mimi-o-sumaseba-wallpaper-757a33152d7cbdfea624f908d364fb73.jpg',
  'https://r4.wallpaperflare.com/wallpaper/245/163/633/spirited-away-studio-ghibli-anime-movies-wallpaper-c27b9a65321e89622dd688e601162d7b.jpg',
  'https://r4.wallpaperflare.com/wallpaper/741/679/796/studio-ghibli-anime-landscape-nature-wallpaper-8bc46dfb016ef4ca21bfa728c3b74619.jpg',
  'https://r4.wallpaperflare.com/wallpaper/108/375/712/nausicaa-of-the-valley-of-the-wind-studio-ghibli-nausicaa-anime-wallpaper-dafdceb6fbba9cd8efb454e9f796fb5f.jpg',
  'https://r4.wallpaperflare.com/wallpaper/67/258/338/anime-studio-ghibli-kari-gurashi-no-arietti-wallpaper-a47a9eb10834c7767e50d88ca92dcf3b.jpg',
  'https://r4.wallpaperflare.com/wallpaper/971/527/602/nausicaa-studio-ghibli-nausicaa-of-the-valley-of-the-wind-nausicaa-kaze-no-tani-no-naushika-hd-wallpaper-296bcffcd343276991f7408af138010c.jpg',
  'https://r4.wallpaperflare.com/wallpaper/652/573/130/nausicaa-of-the-valley-of-the-wind-studio-ghibli-anime-wallpaper-630ad78a95de444ddd5c55627ba89f55.jpg',
  'https://r4.wallpaperflare.com/wallpaper/640/710/445/anime-studio-ghibli-laputa-castle-in-the-sky-wallpaper-3b66ec2d13a15f89a5f43b994decfc30.jpg',
  'https://r4.wallpaperflare.com/wallpaper/718/337/252/studio-ghibli-anime-hauru-no-ugoku-shiro-wallpaper-d004e5760f51e45dfadaba95376f8141.jpg',
]

const imagify = (movie, n) => {
  const imageNumber = ('00' + n.toString()).slice(-3)

  return `${BASE_URL}/${movie}${imageNumber}.jpg`
}

const activateFullScreen = () => {
  if (document.fullscreenElement) {
    document.exitFullscreen()
  } else {
    document.body.requestFullscreen()
  }
}

function App() {
  const [data, setData] = useState({
    movie:
      Object.keys(MOVIES)[
        Math.floor(Math.random() * Object.keys(MOVIES).length)
      ],
    number: 1,
    extra: EXTRA[Math.floor(Math.random() * EXTRA.length)],
  })

  useEffect(() => {
    const interval = setInterval(() => {
      const random = Math.random()
      const movie =
        Object.keys(MOVIES)[
          Math.floor(Math.random() * Object.keys(MOVIES).length)
        ]
      let data = {
        number: Math.floor(Math.random() * MOVIES[movie]),
        movie: movie,
        extra: EXTRA[Math.floor(Math.random() * EXTRA.length)],
      }
      if (random > 0.5) delete data.extra
      setData(data)
    }, 30 * 60 * 1000)

    return () => clearInterval(interval)
  }, [])

  const container = {
    width: '100vw',
    height: '100vh',
    backgroundImage: `url(${
      'extra' in data ? data.extra : imagify(data.movie, data.number)
    })`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }
  return (
    <>
    <div style={overlay} className='vaging'/>
    <div style={container}>
      <button style={buttonStyle} onClick={activateFullScreen}>
        CLICK
      </button>
      <div style={darken} />
      <div style={message}>
        Just Chill 🍂
      </div>
    </div>
    </>
  )
}

export default App

const darken = {
  backgroundColor: 'black',
  opacity: 0.5,
  position: 'fixed',
  bottom: 0,
  right: 0,
  width: '300px',
  height: '100px',
  transform: 'translate(150px, 50px)',
  filter: 'blur(60px)'
}

const message = {
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  fontWeight: '600',
  color: 'white'
}

const buttonStyle = {
  position: 'fixed',
  width: '100vw',
  height: '100vh',
  opacity: 0,
}

const overlay = {
  backgroundColor: '#ffd359',
  opacity: 0.5,
  filter: 'blur(100px)',
  width: '500px',
  height: '400px',
  position: 'fixed',
  rotate: '110deg'
}