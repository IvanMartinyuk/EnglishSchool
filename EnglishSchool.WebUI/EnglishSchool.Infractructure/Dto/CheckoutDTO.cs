﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EnglishSchool.Infractructure.Dto
{
    public class CheckoutDTO
    {
        public string SuccessUrl { get; set; }
        public string CancelUrl { get; set; }
        public string PriceId { get; set; }
    }
}
