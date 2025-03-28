import os from 'os';

export const getLocalIP = () => {
    const interfaces = os.networkInterfaces();
    // console.log(interfaces);
    for(const name in interfaces){
        for(const i of interfaces[name]){
            if(i.family === 'IPv4' && !i.internal){
                return i.address;
            }
        }
    }
    return 'localhost';
}
// getLocalIP()