export function VideoLesson({ videoId, title }) {
  return (
    <div className="w-full bg-slate-900 rounded-3xl overflow-hidden shadow-xl border border-border">
      <div className="aspect-video w-full">
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div className="p-4 bg-card border-t border-border">
        <h4 className="font-bold text-foreground">{title}</h4>
        <p className="text-xs text-muted-foreground mt-1">
          Watch this lesson to perfect your Wudu.
        </p>
      </div>
    </div>
  );
}
