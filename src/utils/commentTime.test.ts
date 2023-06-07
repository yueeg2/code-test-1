import { getCommentTime } from "./commentTime";

const testCaseList = [
  { createdTime: "2023-05-26T00:00:00.150Z", expectedTime: "just now" },
  { createdTime: "2023-05-26T00:00:01.100Z", expectedTime: "1s ago" },
  { createdTime: "2023-05-26T00:00:59.400Z", expectedTime: "59s ago" },
  { createdTime: "2023-05-26T00:01:40.050Z", expectedTime: "1min ago" },
  { createdTime: "2023-05-26T00:59:04.300Z", expectedTime: "59min ago" },
  { createdTime: "2023-05-26T01:00:00.4500Z", expectedTime: "1h ago" },
  { createdTime: "2023-05-26T23:03:00.030Z", expectedTime: "23h ago" },
  { createdTime: "2023-05-27T00:00:00.000Z", expectedTime: "1d ago" },
  { createdTime: "2023-06-01T10:00:00.000Z", expectedTime: "6d ago" },
  { createdTime: "2023-06-03T10:00:00.000Z", expectedTime: "1w ago" },
  { createdTime: "2023-06-24T10:00:00.000Z", expectedTime: "4w ago" },  
  { createdTime: "2023-07-07T10:00:00.000Z", expectedTime: "May 26, 2023" },
];

describe("getCommentTime", () => {
  it.each(testCaseList)('should return $expectedTime for a given $createdTime', ({createdTime, expectedTime}) => {
    const mockCurrentTime = new Date(createdTime).getTime();
    jest.spyOn(Date, "now").mockImplementation(() => mockCurrentTime);

    const result = getCommentTime("2023-05-26T00:00:00.000Z");

    expect(result).toEqual(expectedTime);

    jest.restoreAllMocks(); // restore original Date.now() implementation
  });
});
