import Seo from "@/components/Seo";
import { loadMusic, playingSong } from '@/components/Functions';

export default function Home() {
  window.addEventListener("load", ()=>{
    loadMusic(musicIndex);
    playingSong(); 
  });

  return (
    <>
      <Seo />
      <div className="wrapper">
        <div className="top-bar">
          <i className="material-icons"><img src="https://img.icons8.com/material-outlined/24/null/more.png" alt="More" /></i>
          <span>Now Playing</span>
          <i className="material-icons"><img src="https://img.icons8.com/material-outlined/24/null/settings--v1.png" alt="Setting"/></i>
        </div>
        <div className="img-area">
          <img src="" alt="" />
        </div>
        <div className="song-details">
          <p className="name"></p>
          <p className="artist"></p>
        </div>
        <div className="progress-area">
          <div className="progress-bar">
            <audio id="main-audio" src=""></audio>
          </div>
          <div className="song-timer">
            <span className="current-time">0:00</span>
            <span className="max-duration">0:00</span>
          </div>
        </div>
        <div className="controls">
          <i id="repeat-play-list" className="material-icons" title="Playlist looped"><img src="https://img.icons8.com/material-rounded/24/null/update-left-rotation.png" alt="Repeat" /></i>
          <i id="prev" className="material-icons"><img src="https://img.icons8.com/external-inkubators-glyph-inkubators/25/null/external-previous-video-interface-inkubators-glyph-inkubators.png" alt="Prev" /></i>
          <div className="play-pause">
            <i className="material-icons play"><img src="https://img.icons8.com/external-inkubators-glyph-inkubators/25/null/external-play-button-video-interface-inkubators-glyph-inkubators.png" alt="Play"/></i>
          </div>
          <i id="next" className="material-icons"><img src="https://img.icons8.com/external-inkubators-glyph-inkubators/25/null/external-next-button-video-interface-inkubators-glyph-inkubators.png" alt="Next" /></i>
          <i id="more-music" className="material-icons"><img src="https://img.icons8.com/material-outlined/24/null/list.png" alt="List" /></i>
        </div>
        <div className="music-list">
          <div className="header">
            <div className="row">
              <i className="list material-icons">재생목록</i>
              <span>음악목록</span>
            </div>
            <i id="close" className="material-icons">닫기</i>
          </div>
          <ul>
            {/* 음악목록 */}
          </ul>
        </div>
      </div>
      <style jsx>{`
      .wrapper {
        width: 380px;
        padding: 25px 30px;
        overflow: hidden;
        position: relative;
        border-radius: 15px;
        background: #fff;
        box-shadow: 0 6px 15px rgba(0,0,0,0.15);
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-use-select: none;
        user-select: none;
      }
      .wrapper i {
        cursor: pointer;
      }
      .top-bar,
      .progress-area,
      .song-timer,
      .controls,
      .music-list
      .header,
      .music-list ul li {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .top-bar i {
        font-size: 10px;
        opacity: 0.5;
      }
      .top-bar i:first-child {
        margin-left: -7px;
      }
      .top-bar span {
        font-size: 15px;
        margin-left: -3px;
        color: rgba(0,0,0,0.7);
      }
      .img-area {
        width: 100%;
        height: 256px;
        overflow: hidden;
        margin-top: 25px;
        border-radius: 15px;
        box-shadow: 0 6px 12px rgba(0,0,0,0.15);
      }
      .img-area img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .song-details {
        text-align: center;
        margin: 30px 0;
      }
      .song-details p {
        color: rgba(0,0,0,0.15);
      }
      .song-details .name {
        font-size: 21px;
      }
      ..song-details .artist {
        font-size: 18px;
        opacity: 0.9;
        line-height: 35px;
      }
      .progress-area {
        height: 6px;
        width: 100%;
        border-radius: 50px;
        background: #f0f0f0;
        cursor: pointer;
      }
      .progress-area .progress-bar {
        height: inherit;
        width: 0%;
        position: relative;
        border-radius: inherit;
        background: #000;
      }
      .progress-bar::before {
        content: "";
        position: absolute;
        height: 12px;
        width: 12px;
        border-radius: 50%;
        top: 50%;
        right: -5px;
        z-index: 2;
        opacity: 0;
        pointer-events: none;
        transform: translateY(-50%);
        background: inherit;
        transition: opacity 0.2s ease;
      }
      .progress-area:hover .progress-bar::before{
        opacity: 1;
        pointer-events: auto;
      }
      .progress-area .song-timer{
        margin-top: 2px;
      }
      .song-timer span{
        font-size: 13px;
        color: rgba(0,0,0,0.15);
      }
      .controls{
        margin: 40px 0 5px 0;
      }
      .controls i{
        font-size: 10px;
        user-select: none;
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      .controls i:nth-child(2),
      .controls i:nth-child(4){
        font-size: 20px;
      }
      .controls #prev{
        margin-right: -13px;
      }
      .controls #next{
        margin-left: -13px;
      }
      .controls .play-pause{
        height: 54px;
        width: 54px;
        display: flex;
        cursor: pointer;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        box-shadow: 0px 0px 5px #000;
      }
      .play-pause::before{
        position: absolute;
        content: "";
        height: 43px;
        width: 43px;
        border-radius: inherit;
      }
      .play-pause i{
        height: 43px;
        width: 43px;
        line-height: 60px;
        text-align: center;
        margin-left: 6px;
        background: inherit;
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        position: absolute;
      }
      .music-list{
        position: absolute;
        background: var(--white);
        width: 100%;
        left: 0;
        bottom: -55%;
        opacity: 0;
        pointer-events: none;
        z-index: 5;
        padding: 15px 30px;
        border-radius: 15px;
        box-shadow: 0px -5px 10px rgba(0,0,0,0.1);
        transition: all 0.15s ease-out;
      }
      .music-list.show{
        bottom: 0;
        opacity: 1;
        pointer-events: auto;
      }
      .header .row{
        display: flex;
        align-items: center;
        font-size: 15px;
        color: rgba(0,0,0,0.15);
      }
      .header .row i{
        cursor: default;
      }
      .header .row span{
        margin-left: 5px;
      }
      .header #close{
        font-size: 15px;
        color: rgba(0,0,0,0.15);
      }
      .music-list ul{
        margin: 10px 0;
        max-height: 260px;
        overflow: auto;
      }
      .music-list ul::-webkit-scrollbar{
        width: 0px;
      }
      .music-list ul li{
        list-style: none;
        display: flex;
        cursor: pointer;
        padding-bottom: 10px;
        margin-bottom: 5px;
        color: rgba(0,0,0,0.15);
        border-bottom: 1px solid #E5E5E5;
      }
      .music-list ul li:last-child{
        border-bottom: 0px;
      }
      .music-list ul li .row span{
        font-size: 10px;
      }
      .music-list ul li .row p{
        opacity: 0.9;
      }
      ul li .audio-duration{
        font-size: 10px;
      }
      ul li.playing{
        pointer-events: none;
        color: #9f6ea3;
      }
      `}</style>
    </>
  )
}
