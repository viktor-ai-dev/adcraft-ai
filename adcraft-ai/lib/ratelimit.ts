
const requests = new Map<string, number[]>();

export function rateLimit(ip: string, limit = 10, windowMs = 60000) {
  const now = Date.now();

  if (!requests.has(ip)) {
    requests.set(ip, []);
  }

  const timestamps = requests.get(ip)!;

  // keep only recent requests
  const recent = timestamps.filter(
    (t) => now - t < windowMs
  );

  if (recent.length >= limit) {
    requests.set(ip, recent);
    return false;
  }

  recent.push(now);
  requests.set(ip, recent);

  return true; 
}