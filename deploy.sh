#!/usr/bin/env bash

npm run build

if [ $? == 0 ]; then

remoteDir=/www/wwwroot/admin.a1001zhuche.jds.wuchuheng.com
localDir=dist
sftp root@admin.a1001zhuche.jds.wuchuheng.com << EOD
    lcd $localDir
    put -r ./* $remoteDir
    quit
EOD

fi


