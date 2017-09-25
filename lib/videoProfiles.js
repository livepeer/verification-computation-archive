const videoProfileLookup = {
    "P720p60fps16x9": {name: "P720p60fps16x9", bitrate: "6000k", framerate: 60, resolution: "1280x720"},
    "P720p30fps16x9": {name: "P720p30fps16x9", bitrate: "4000k", framerate: 30, resolution: "1280x720"},
    "P720p30fps4x3": {name: "P720p30fps4x3", bitrate: "4000k", framerate: 30, resolution: "960x720"},
    "P576p30fps16x9": {name: "P576p30fps16x9", bitrate: "1000k", framerate: 30, resolution: "1024x576"},
    "P360p30fps16x9": {name: "P360p30fps16x9", bitrate: "1000k", framerate: 30, resolution: "640x360"},
    "P360p30fps4x3": {name: "P360p30fps4x3", bitrate: "1000k", framerate: 30, resolution: "480x360"},
    "P240p30fps16x9": {name: "P240p30fps16x9", bitrate: "700k", framerate: 30, resolution: "426x240"},
    "P240p30fps4x3": {name: "P240p30fps4x3", bitrate: "700k", framerate: 30, resolution: "320x240"},
    "P144p30fps16x9": {name: "P144p30fps16x9", bitrate: "400k", framerate: 30, resolution: "256x144"}
}

const parseTranscodingOptions = transcodingOptions => {
    const videoProfiles = transcodingOptions.split(",")

    return videoProfiles.filter(profile => {
        return profile in videoProfileLookup
    }).map(profile => {
        return videoProfileLookup[profile]
    })
}

module.exports = {
    parseTranscodingOptions
}
