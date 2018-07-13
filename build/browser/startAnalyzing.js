/**
 * this script gets executed in the browser
 */
module.exports = function startAnalyzing (_, pcSelectorMethod, interval) {
    var cb = arguments[arguments.length - 1];

    /**
     * sanitize stat values
     */
    function sanitize (val) {
        if (typeof val !== 'string' && typeof val !== 'number') {
            return undefined;
        }

        return parseInt(val, 10);
    }

    /**
     * record stats
     */
    function traceStats (results) {
        var result = {
            audio: {},
            video: {},
            results: results
        };

        for (var key in results) {
            var res = results[key];

            if (res.type === 'inbound-rtp' && res.mediaType === 'audio') {
                var inboundAudioStream = results[res.trackId];
                result.audio.inbound = {
                    bytesReceived: sanitize(res.bytesReceived),
                    packetsReceived: sanitize(res.packetsReceived),
                    audioLevel: sanitize(inboundAudioStream.audioLevel),
                    packetsLost: sanitize(res.packetsLost)
                };
            } else if (res.type === 'outbound-rtp' && res.mediaType === 'audio') {
                var outboundAudioStream = results[res.trackId];
                result.audio.outbound = {
                    bytesSent: sanitize(res.bytesSent),
                    packetsSent: sanitize(res.packetsSent),
                    audioLevel: sanitize(outboundAudioStream.audioLevel)
                };
            } else if (res.type === 'inbound-rtp' && res.mediaType === 'video') {
                var inboundVideoStream = results[res.trackId];
                result.video.inbound = {
                    bytesReceived: sanitize(res.bytesReceived),
                    packetsReceived: sanitize(res.packetsReceived),
                    framesReceived: sanitize(inboundVideoStream.framesReceived),
                    framesDecoded: sanitize(inboundVideoStream.framesDecoded),
                    framesDropped: sanitize(inboundVideoStream.framesDropped),
                    packetsLost: sanitize(res.packetsLost),
                    frameWidth: sanitize(inboundVideoStream.frameWidth),
                    frameHeight: sanitize(inboundVideoStream.frameHeight)
                };
            } else if (res.type === 'outbound-rtp' && res.mediaType === 'video') {
                var outboundVideoStream = results[res.trackId];
                result.video.outbound = {
                    bytesSent: sanitize(res.bytessent),
                    packetsSent: sanitize(res.packetsSent),
                    framesEncoded: sanitize(res.framesEncoded),
                    framesSent: sanitize(outboundVideoStream.framesSent),
                    hugeFramesSent: sanitize(outboundVideoStream.hugeFramesSent),
                    frameWidth: sanitize(outboundVideoStream.frameWidth),
                    frameHeight: sanitize(outboundVideoStream.frameHeight)
                };
            }
        }

        var timestamp = new Date().getTime();
        window._webdriverrtc[timestamp] = result;
    }

    /**
     * get RTCStatsReports
     */
    function getStats () {
        pc.getStats().then(function (stats) {
            var items = {};
            var connectionType = {};
            var candidatePair;

            for (var result of stats) {
                var item = result[1];
                items[item.id] = item;

                if (item.type === 'candidate-pair' && item.state === 'succeeded') {
                    candidatePair = item;
                }
            }

            if (candidatePair) {
                var localCandidate = items[candidatePair.localCandidateId];
                var remoteCandidate = items[candidatePair.remoteCandidateId];

                connectionType = {
                    local: localCandidate,
                    remote: remoteCandidate
                };
            }

            traceStats(items);
            window._webdriverrtcTimeout = setTimeout(getStats.bind(window), interval);

            if (typeof cb === 'function') {
                cb(connectionType);
                cb = undefined;
            }
        });
    }

    var pc = pcSelectorMethod() || window.webdriverRTCPeerConnectionBucket;

    if (!pc || pc.constructor.name !== 'RTCPeerConnection') {
        throw new Error('RTCPeerConnection not found');
    }

    window._webdriverrtc = {};
    window._webdriverrtcTimeout = null;
    getStats();
};
