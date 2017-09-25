tar xvfz go-ipfs_v0.4.10_linux-386.tar.gz
mv go-ipfs/ipfs /usr/local/bin/ipfs

mkdir ffmpeg-64bit-static
tar -xf ffmpeg-release-64bit-static.tar.xz -C ffmpeg-64bit-static --strip-components=1
mv ffmpeg-64bit-static/ffmpeg /usr/local/bin/ffmpeg

ipfs init
ipfs config Addresses.API /ip4/127.0.0.1/tcp/5001
ipfs daemon &

sleep 10
