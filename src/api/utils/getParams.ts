export default function getParams(method: string, token: any, data: any) {
  let params;
  if (data) {
    params = {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
  } else {
    params = {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
  }
  return params;
}
