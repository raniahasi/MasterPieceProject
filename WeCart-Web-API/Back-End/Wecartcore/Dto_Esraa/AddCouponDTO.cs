﻿namespace Wecartcore.DTO
{
    public class AddCouponDTO
    {
        public string? Name { get; set; }

        public decimal? Amount { get; set; }
        public int? Status { get; set; }


        public DateOnly? Date { get; set; }
    }
}
