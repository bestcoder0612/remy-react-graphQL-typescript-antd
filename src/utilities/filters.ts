import moment from 'moment';

type DateFilter = {
  _or: {
    [key: string]: {
      _gte?: moment.Moment;
      _lte?: moment.Moment;
    };
  }[];
};

export function getDateRange(range?: [string, string]): DateFilter {
  const [start, end] = range || [];
  return {
    _or: [
      {
        start_date: {
          _gte: moment(start),
          _lte: moment(end)
        }
      },
      {
        end_date: {
          _gte: moment(start),
          _lte: moment(end)
        }
      }
    ]
  };
}

type FilterParams = {
  brands?: string[];
  countries?: string[];
  markets?: string[];
  date_range?: [string, string];
};

export function createEventsFilter({
  brands,
  countries,
  date_range
}: FilterParams): any {
  const b = brands && brands.length > 0;
  const c = countries && countries.length > 0;
  const d = date_range && date_range.length === 2;

  if (!b && !c && !d) return false;

  return {
    ...(b && {
      brand_id: { _in: brands },
      ...(c && {
        brand: {
          brand_countries: { country_id: { _in: countries } }
        }
      })
    }),
    ...(c && {
      country_id: { _in: countries }
    }),
    ...(d && getDateRange(date_range))
  };
}

export function createActivitiesFilter({
  brands,
  countries,
  date_range,
  markets
}: FilterParams): any {
  const b = brands && brands.length > 0;
  const c = countries && countries.length > 0;
  const d = date_range && date_range.length === 2;
  const m = markets && markets.length > 0;
  if (!b && !c && !d && !m) return false;
  const or = [];
  c && or.push({ country_id: { _in: countries } });
  m &&
    or.push({
      country: {
        country_markets: { market_id: { _in: markets } }
      }
    });

  return {
    ...(b && {
      id: { _in: brands }
    }),
    ...(or.length > 0 && {
      brand_countries: {
        _or: or
      }
    }),
    ...(d && {
      events: getDateRange(date_range)
    })
  };
}

export function createMetricsFilter({
  countries,
  date_range,
  markets
}: FilterParams): any {
  const c = countries && countries.length > 0;
  const d = date_range && date_range.length === 2;
  const m = markets && markets.length > 0;
  if (!c && !d && !m) return false;
  const [start, end] = date_range || [];

  const or = [];
  c && or.push({ country_id: { _in: countries } });
  m &&
    or.push({
      country: {
        country_markets: { market_id: { _in: markets } }
      }
    });

  return {
    ...(or.length > 0 && { _or: or }),
    ...(d && {
      date: {
        _gte: moment(start),
        _lte: moment(end)
      }
    })
  };
}
