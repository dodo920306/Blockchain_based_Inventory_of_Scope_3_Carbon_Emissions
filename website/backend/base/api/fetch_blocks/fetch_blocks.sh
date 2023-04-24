#!/bin/bash

export FABRIC_CFG_PATH=/home/ubuntu/fabric-samples/config/

# 執行 peer channel getinfo 並擷取 Blockchain 資訊中的高度值
height=$(/home/ubuntu/fabric-samples/bin/peer channel getinfo -c mychannel | grep -oP '(?<="height":)\d+')

# 設定預設區塊檔名
block_filename="mychannel"

for ((i=0; i<$height; i++))
do
  # 判斷區塊檔案是否已存在
  if ! [ -f "${block_filename}_$i.json" ]
  then
    # 取得對應區塊的資訊
    /home/ubuntu/fabric-samples/bin/peer channel fetch $i /home/ubuntu/website/backend/base/api/fetch_blocks/${block_filename}_$i.block -c mychannel 2> /dev/null
    /home/ubuntu/fabric-samples/bin/configtxlator proto_decode --input /home/ubuntu/website/backend/base/api/fetch_blocks/${block_filename}_$i.block --type common.Block --output /home/ubuntu/website/backend/base/api/fetch_blocks/${block_filename}_$i.json
    
    # 刪除區塊檔案
    rm /home/ubuntu/website/backend/base/api/fetch_blocks/${block_filename}_$i.block
  fi
done
