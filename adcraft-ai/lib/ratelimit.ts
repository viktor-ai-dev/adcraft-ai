
const requests = new Map();

export function rateLimit(ip: string){

    const now = Date.now();

    if(!requests.has(ip)){
        requests.set(ip,[])
    }

    const timestamps = requests.get(ip);

    const recent = timestamps.filter(
        (t: number) => now - t < 60000 // Recent om mindre än 60 sec
    );

    if (recent.length > 10) {
        return false;
    }

    recent.push(now);
    requests.set()
}