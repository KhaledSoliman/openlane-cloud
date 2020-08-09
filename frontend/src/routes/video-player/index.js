//Video Player

import React, { Component } from 'react';
import {
   Player, ControlBar, ReplayControl,
   ForwardControl, CurrentTimeDisplay,
   TimeDivider, PlaybackRateMenuButton, VolumeMenuButton, BigPlayButton
} from 'video-react';
//Components
import DownloadButton from './component/DownloadButton';
import HLSComponent from './component/HLSComponent';
// intl messages
import IntlMessages from 'Util/IntlMessages';

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

const Shortcut = [
   {
      id:1,
      action1: "Increase speed",
      shortcut1: "Shift + >",
      action2: "Decrease speed",
      shortcut2: "Shift + <"
   },
   {
      id: 2,
      action1: "Go back 5 seconds",
      shortcut1: "Left arrow",
      action2: "Go forward 5 seconds",
      shortcut2: "Right arrow"
   },
   {
      id: 3,
      action1: "Go back 10 seconds",
      shortcut1: "j",
      action2: "Go forward 10 seconds",
      shortcut2: "l"
   },
   {
      id: 4,
      action1: "Go to Full Screen mode",
      shortcut1: "f",
      action2: "Exit Full Screen mode",
      shortcut2: "Escape"
   },
   {
      id: 5,
      action1: "Increase volume 5%",
      shortcut1: "Up arrow",
      action2: "Decrease volume 5%",
      shortcut2: "Down arrow"
   },
   {
      id: 6,
      action1: "Toggle play/pause the video",
      shortcut1: "k or Spacebar",
      action2: "",
      shortcut2: ""
   }
]

class VideoPlayer extends Component {
   render() {
      return (
         <div className="video-player-wrapper">
            <PageTitleBar title={<IntlMessages id="sidebar.videoPlayer" />} match={this.props.match} />
            <div className="row">
               <RctCollapsibleCard
                  colClasses="col-sm-12 col-md-12 col-lg-6"
                  heading={<IntlMessages id="widgets.baseConfig" />}
               >
                  <Player
                     playsInline
                     poster="http://reactify.theironnetwork.org/data/images/sintel.jpg"
                     src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
                  />
               </RctCollapsibleCard>
               <RctCollapsibleCard
                  colClasses="col-sm-12 col-md-12 col-lg-6"
                  heading={<IntlMessages id="widgets.withDownloadButton" />}
               >
                  <Player
                     poster="http://reactify.theironnetwork.org/data/images/bunny-poster.jpg"
                     src="http://media.w3.org/2010/05/bunny/movie.mp4"
                  >
                     <ControlBar autoHide={false}>
                        <DownloadButton order={7} />
                        <BigPlayButton position="center" />
                     </ControlBar>
                  </Player>
               </RctCollapsibleCard>
               <RctCollapsibleCard
                  colClasses="col-sm-12 col-md-12 col-lg-6"
                  heading={<IntlMessages id="widgets.customControlBar" />}
               >
                  <Player
                     poster="http://reactify.theironnetwork.org/data/images/nature-poster.jpg"
                  >
                     <source src="http://7xkwa7.media1.z0.glb.clouddn.com/sample_video_L" />
                     <ControlBar>
                        <ReplayControl seconds={10} order={1.1} />
                        <ForwardControl seconds={30} order={1.2} />
                        <CurrentTimeDisplay order={4.1} />
                        <TimeDivider order={4.2} />
                        <PlaybackRateMenuButton
                           rates={[5, 2, 1, 0.5, 0.1]}
                           order={7.1}
                        />
                        <VolumeMenuButton />
                     </ControlBar>
                  </Player>
               </RctCollapsibleCard>
               <RctCollapsibleCard
                  colClasses="col-sm-12 col-md-12 col-lg-6"
                  heading={<IntlMessages id="widgets.httpLiveStreaming" />}
               >
                  <Player>
                     <HLSComponent
                        isVideoChild
                        src="https://logos-channel.scaleengine.net/logos-channel/live/biblescreen-ad-free/playlist.m3u8"
                     />
                  </Player>
               </RctCollapsibleCard>
               <RctCollapsibleCard
                  colClasses="col-sm-12 col-md-12 col-lg-12"
                  heading={<IntlMessages id="widgets.keyboardShortcuts" />}
               >
                  <div className="table-responsive">
                     <table className="table table-hover mb-0">
                        <thead>
                           <tr>
                              <th>Action</th>
                              <th>Shortcut</th>
                              <th>Action</th>
                              <th>Shortcut</th>
                           </tr>
                        </thead>
                        <tbody>
                           {Shortcut && Shortcut.map((data, key) => (
                              <tr key={key}>
                                 <td>{data.action1}</td>
                                 <td>{data.shortcut1}</td>
                                 <td>{data.action2}</td>
                                 <td>{data.shortcut2}</td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
               </RctCollapsibleCard>
            </div>
         </div>
      )
   }
}
export default VideoPlayer;
