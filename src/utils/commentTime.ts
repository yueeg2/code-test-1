const getCommentTime = (createdTime: string): string => {
  const dateOption: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const handleTime = (time: number) => {
    const duration = Date.now() - time;
    let secago = Math.floor(duration / (1000 ));
    let minago = Math.floor(duration / (60 * 1000));
    let hourago = Math.floor(duration / (60 * 60 * 1000));
    let dayago = Math.floor(hourago / 24);
    let weekago = Math.floor(dayago / 7);
    let mouthago = Math.floor(dayago / 30);
    //console.log("duration: ", minago, hourago, dayago, weekago);
    let isAgo = (secago || minago || hourago || dayago || weekago ) && !mouthago;
    return (
      (mouthago > 0
        ? new Date(time).toLocaleDateString(undefined, dateOption)
        : weekago > 0
        ? `${weekago}w`
        : dayago > 0
        ? `${dayago}d`
        : hourago > 0
        ? `${hourago}h`
        : minago > 0
        ? `${minago}min`
        : `${secago <= 0 ? "just now" : secago + "s"}`) + (isAgo ? " ago" : "")
    );
  };

  return handleTime(Date.parse(createdTime));
};

export { getCommentTime };
