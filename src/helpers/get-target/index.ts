export default function GetTarget(event: any = {}): any {
  return event ? event.currentTarget || event.target || event : event;
}
