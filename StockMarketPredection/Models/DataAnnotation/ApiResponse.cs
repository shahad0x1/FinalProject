using Microsoft.CodeAnalysis;
using System.Text.Json.Serialization;

namespace StockMarketPredection.Models.DataAnnotation
{
    public class ApiResponse
    {
        [JsonPropertyName("chart")]
        public Chart Chart { get; set; }
    }

    public class Chart
    {
        [JsonPropertyName("result")]
        public List<StockResult> Result { get; set; }
    }

    public class StockResult
    {
        [JsonPropertyName("meta")]
        public MetaData Meta { get; set; }

        [JsonPropertyName("timestamp")]
        public List<long> Timestamps { get; set; }

        [JsonPropertyName("indicators")]
        public Indicator Indicators { get; set; }
    }

    public class MetaData
    {
        [JsonPropertyName("currency")]
        public string Currency { get; set; }

        [JsonPropertyName("symbol")]
        public string Symbol { get; set; }

        [JsonPropertyName("exchangeName")]
        public string ExchangeName { get; set; }
    }

    public class Indicator
    {
        [JsonPropertyName("quote")]
        public List<Quote> Quotes { get; set; }
    }

    public class Quote
    {
        [JsonPropertyName("open")]
        public List<double?> Open { get; set; }

        [JsonPropertyName("close")]
        public List<double?> Close { get; set; }

        [JsonPropertyName("high")]
        public List<double?> High { get; set; }

        [JsonPropertyName("low")]
        public List<double?> Low { get; set; }
    }
}
