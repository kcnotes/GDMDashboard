/* eslint-disable no-invalid-this */
/**
 * <nowiki>
 * Dashboard for Global Discussions Moderators
 * @see https://github.com/kcnotes/GDMDashboard/tree/master/src/fandom_loaded/gdmdashboard.ts
 * @author Noreplyz
 *
 * Hello JS Reviewer! To help you on your quest for secure scripts: this code is most easily viewed in Typescript via
 * the link above. This script takes in content from wiki pages and relies on Mustache and Chart.js to check and render
 * content safely to mitigate security risks.
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const jQuery: any;
declare const Mustache: any;
declare const importArticles: any;
declare const Chart: any;
declare const mw: any;
declare const OO: any;

type SummaryInfo = {
  lang: string,
  vertical: string,
  articleComment: number,
  forum: number,
  wall: number,
  wikis: number,
};

type WikiInfo = {
  wikiId: number,
  domain: string,
  sitename: string,
  lang: string,
  vertical: string,
  wikiRepresentative: number,
  articleComment: number,
  forum: number,
  wall: number,
  lastReported: Date,
};

type WikiInfoWithWR = WikiInfo & { wrUsername: string };

type ReportsWikisSums = {
  reports: number,
  wikis: number,
};

type Counts = {
  articleComment: number,
  forum: number,
  wall: number,
  wikis: number,
};

type Sums = Counts & {
  langs: Record<string, ReportsWikisSums>,
  verticals: Record<string, ReportsWikisSums>,
};

type WithHistory<T> = {
  timestamp: Date,
  data: T,
};

type TableState = {
  wr: string,
  lang: string,
  vertical: string,
  sortby: 'articleComment' | 'forum' | 'wall' | 'domain',
  page: number,
  limit: number,
};

type GDMDParams = {
  user: string,
  lang: string,
  vertical: string,
  limit: number,
};

(function(window, $, mw) {
  if ('GDMDashboardLoaded' in window) return;
  if ($('#gdm-dashboard').length === 0 && $('#gdm-dashboard-summary').length === 0) return;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).GDMDashboardLoaded = true;
  const isDarkMode = document.body.classList.contains(
    'theme-fandomdesktop-dark',
  );

  const defaultChartOptions = {
    legend: {
      labels: {
        boxWidth: 12,
        fontColor: isDarkMode ? '#FFF' : '#000',
      },
    },
  };

  const pages = {
    summary: 'Data:Overview/summary',
    counts: 'Data:Overview/counts',
    wr: 'Data:Overview/wr',
    gdm: 'Data:Overview/discussions',
    ignore: 'Data:Dashboard/ignore',
  };

  const schema = [
    'wikiId',
    'domain',
    'sitename',
    'lang',
    'vertical',
    'wikiRepresentative',
    'articleComment',
    'forum',
    'wall',
    'lastReported',
  ];

  const summarySchema = [
    'lang',
    'vertical',
    'articleComment',
    'forum',
    'wall',
    'wikis',
  ];

  const countSchema = [ 'articleComment', 'forum', 'wall', 'wikis' ];

  const colors = [
    '#520045',
    '#83004e',
    '#be0055',
    '#f9005b',
    '#fc632e',
    '#fec600',
    '#c2cf6e',
    '#86d7db',
    '#bfe2db',
    '#f8eddb',
  ];

  const getPage = (page: string): Promise<string | null> => {
    const data = {
      action: 'query',
      prop: 'revisions',
      titles: page,
      rvprop: 'content',
      cb: Math.random().toString(),
      format: 'json',
    };
    return fetch(`/api.php?${new URLSearchParams(data).toString()}`)
      .then(resp => resp.json())
      .then((data: any) => {
        if (!data.query || !data.query.pages) {
          console.warn(`Could not get page ${page}`);
          return null;
        }
        for (const pageid in data.query.pages) {
          if (
            !data.query.pages[pageid] ||
            !data.query.pages[pageid].revisions ||
            !data.query.pages[pageid].revisions.length
          ) {
            console.warn(`Could not get page ${page}`);
            return null;
          }
          return data.query.pages[pageid].revisions[0]['*'];
        }
        return null;
      });
  };

  const getPageWithHistory = (page: string): Promise<WithHistory<string>[] | null> => {
    const data = {
      action: 'query',
      prop: 'revisions',
      titles: page,
      rvprop: 'timestamp|content',
      cb: Math.random().toString(),
      rvlimit: '90',
      format: 'json',
    };
    return fetch(`/api.php?${new URLSearchParams(data).toString()}`)
      .then((resp) => resp.json())
      .then((data: any) => {
        if (!data.query || !data.query.pages) {
          console.warn(`Could not get page ${page}`);
          return null;
        }
        for (const pageid in data.query.pages) {
          if (
            !data.query.pages[pageid] ||
            !data.query.pages[pageid].revisions ||
            !data.query.pages[pageid].revisions.length
          ) {
            console.warn(`Could not get page ${page}`);
            return null;
          }
          return data.query.pages[pageid].revisions.map(
            (rev: { '*': string, timestamp: string }) => ({
              timestamp: rev.timestamp,
              data: rev['*'],
            }),
          );
        }
        return null;
      });
  };

  const getUserDetails = (ids: number[]) => {
    return fetch(`https://services.fandom.com/user-attribute/user/bulk?id=${ids.join('&id=')}`)
      .then(resp => resp.json());
  };

  const convertCountSchema = (data: WithHistory<string>[]): WithHistory<Counts>[] => {
    const entries: WithHistory<string[]>[] = data.map(entry => ({
      timestamp: entry.timestamp,
      data: parseFields(entry.data)[0],
    }));
    return entries.map((entry) => {
      if (entry.data.length != countSchema.length) {
        console.log(entry.data, countSchema);
        throw new Error('Counts data does not match schema');
      }
      return {
        timestamp: new Date(entry.timestamp),
        data: {
          articleComment: Number(entry.data[0]),
          forum: Number(entry.data[1]),
          wall: Number(entry.data[2]),
          wikis: Number(entry.data[3]),
        },
      };
    });
  };

  const convertSummarySchema = (data: string[]): SummaryInfo => {
    if (data.length != summarySchema.length) {
      throw new Error('Summary data does not match schema');
    }
    return {
      lang: data[0],
      vertical: data[1],
      articleComment: Number(data[2]),
      forum: Number(data[3]),
      wall: Number(data[4]),
      wikis: Number(data[5]),
    };
  };

  const convertWikiSchema = (data: string[]): WikiInfo => {
    if (data.length != schema.length) {
      throw new Error('Summary data does not match schema');
    }
    return {
      wikiId: Number(data[0]),
      domain: data[1],
      sitename: data[2],
      lang: data[3],
      vertical: data[4],
      wikiRepresentative: Number(data[5]),
      articleComment: Number(data[6]),
      forum: Number(data[7]),
      wall: Number(data[8]),
      lastReported: new Date(data[9]),
    };
  };

  const parseFields = (data: string): string[][] => {
    return data
      .split('\n')
      .filter((line) => line.startsWith('*')) // Ignore category
      .map((line) => line.slice(1).split('|')); // Get fields
  };

  // Tracked state
  const filterStates: TableState = {
    wr: '',
    lang: '',
    vertical: '',
    sortby: 'forum',
    page: 1,
    limit: 10,
  };

  let previous: TableState = { ...filterStates };

  const renderTable = (
    wikiReports: WikiInfoWithWR[],
    userMap: Record<string, string>,
    filter: TableState,
    onPageChange: (page: number) => void,
  ) => {
    const { wr, vertical, lang, page, limit } = filter;
    // Filter and render
    const reports = wikiReports
      .filter(
        (w) => wr === '' || w.wikiRepresentative.toString() === userMap[wr],
      )
      .filter((w) => vertical === '' || w.vertical === vertical)
      .filter((w) => lang === '' || w.lang === lang)
      .sort((a, b) => {
        switch (filter.sortby) {
        case 'forum':
          return b.forum - a.forum;
        case 'wall':
          return b.wall - a.wall;
        case 'articleComment':
          return b.articleComment - a.articleComment;
        case 'domain':
          return a.domain.localeCompare(b.domain);
        }
      });

    const table = `
    <table class="article-table gdmd-report-results">
      <thead>
        <th>Wiki</th>
        <th>Language</th>
        <th>Vertical</th>
        <th>WR</th>
        <th>Posts</th>
        <th>Messages</th>
        <th>Comments</th>
      </thead>
      <tbody>
        {{#wikis}}
          <tr>
            <td><a href="https://{{domain}}/f" target="_blank">{{sitename}}</a> (<a href="//{{domain}}/Special:ListUsers/sysop,bureaucrat,threadmoderator" target="_blank">mods</a>)</td>
            <td>{{lang}}</td>
            <td>{{vertical}}</td>
            <td>{{wrUsername}}</td>
            <td><a href="https://{{domain}}/f/reported?type=posts" target="_blank">{{forum}}</a></td>
            <td><a href="https://{{domain}}/f/reported?type=messages" target="_blank">{{wall}}</a></td>
            <td><a href="https://{{domain}}/f/reported?type=comments" target="_blank">{{articleComment}}</a></td>
          </tr>
        {{/wikis}}
      </tbody>
    </table>
    `;

    const paginatedReports = reports.slice((page - 1) * limit, page * limit);

    $('#gdmd-report-table')
      .empty()
      .append(
        Mustache.render(table, {
          wikis: paginatedReports,
        }),
      );
    $('#gdmd-report-table').append($('<div class="gdmd-pagination">').append(
      renderPageCounts(
        Math.ceil(reports.length / limit),
        filter.page,
        onPageChange,
      ).$element,
    ));
  };

  const memoRenderTable = (
    wikiReports: WikiInfoWithWR[],
    userMap: Record<string, string>,
    filter: TableState,
    onPageChange: (page: number) => void,
  ) => {
    if (
      filter.limit !== previous.limit ||
      filter.page !== previous.page ||
      filter.sortby !== previous.sortby ||
      filter.vertical !== previous.vertical ||
      filter.lang !== previous.lang ||
      filter.wr !== previous.wr
    ) {
      previous = { ...filter };
      return renderTable(wikiReports, userMap, filter, onPageChange);
    }
  };

  const renderPageCounts = (pages: number, currentPage: number, onClick: (page: number) => void) => {
    let pageCounts = Array.from({ length: pages }, (_, i) => `${i + 1}`);
    if (pages > 7) {
      if (currentPage < 4) {
        pageCounts = pageCounts.splice(0, 7);
      } else if (currentPage > pages - 4) {
        pageCounts = pageCounts.splice(pages - 7, pages - 1);
      } else {
        pageCounts = [
          currentPage - 3,
          currentPage - 2,
          currentPage - 1,
          currentPage,
          currentPage + 1,
          currentPage + 2,
          currentPage + 3,
        ].map(p => p.toString());
      }
      pageCounts = [ 'first', ...pageCounts, 'last' ];
    }
    const pagination = new OO.ui.ButtonGroupWidget({
      items: pageCounts.map((i) => {
        const button = new OO.ui.ButtonWidget({
          label: [ 'first', 'last' ].includes(i) ? undefined : `${i}`,
          icon: [ 'first', 'last' ].includes(i) ? i : undefined,
          flags: i === currentPage.toString() ? ['primary'] : [],
        });
        button.on('click', () => {
          if (i === 'first') {
            return onClick(1);
          } else if (i === 'last') {
            return onClick(pages);
          }
          onClick(Number(i));
        });
        return button;
      }),
    });
    return pagination;
  };

  const renderDropdown = <T>(options: { data: T, label: string }[], onClick: (value: T) => void) => {
    const dropdown = new OO.ui.DropdownInputWidget({
      required: true,
      options: options.map((option) => {
        return option;
      }),
    });
    dropdown.on('change', onClick);
    return dropdown;
  };

  const chartPromise = importArticles({
    type: 'script',
    articles: ['u:dev:MediaWiki:Chart.js'],
  });

  const getSums = (summaries: SummaryInfo[]): Sums => {
    const sums: Sums = {
      articleComment: 0,
      forum: 0,
      wall: 0,
      wikis: 0,
      langs: {},
      verticals: {},
    };
    summaries.forEach((summary) => {
      const total = summary.articleComment + summary.forum + summary.wall;
      sums.articleComment += summary.articleComment;
      sums.forum += summary.forum;
      sums.wall += summary.wall;
      sums.wikis += summary.wikis;
      if (sums.langs[summary.lang]) {
        sums.langs[summary.lang].reports += total;
        sums.langs[summary.lang].wikis += summary.wikis;
      } else {
        sums.langs[summary.lang] = {
          reports: total,
          wikis: summary.wikis,
        };
      }
      if (sums.verticals[summary.vertical]) {
        sums.verticals[summary.vertical].reports += total;
        sums.verticals[summary.vertical].wikis += summary.wikis;
      } else {
        sums.verticals[summary.vertical] = {
          reports: total,
          wikis: summary.wikis,
        };
      }
    });
    return sums;
  };

  const convertToOther = (
    data: Record<string, ReportsWikisSums>,
    max: number,
    sortBy: keyof ReportsWikisSums,
  ): Record<string, ReportsWikisSums> => {
    if (Object.keys(data).length <= max) return data;
    const sorted = Object.entries(data).sort((a, b) => {
      return b[1][sortBy] - a[1][sortBy];
    });
    const res: Record<string, ReportsWikisSums> = {};
    sorted.forEach(([ type, sums ], index) => {
      if (index < max - 1) {
        res[type] = sums;
        return;
      }
      if (!('other' in res)) {
        res['other'] = {
          reports: 0,
          wikis: 0,
        };
      }
      res['other'].reports += sums.reports;
      res['other'].wikis += sums.wikis;
    });
    return res;
  };

  const createChart = (
    type: 'line' | 'pie' | 'bar',
    elementId: string,
    labels: string[] | Date[] | number[],
    datasets: {
      label: string;
      data: number[];
      stack?: string;
      [key: string]: unknown;
    }[],
    options: Record<string, unknown> = defaultChartOptions,
  ) => {
    new Chart(
      (document.getElementById(elementId) as HTMLCanvasElement).getContext(
        '2d',
      ),
      {
        type,
        data: {
          labels,
          datasets: datasets.map((dataset) => ({
            backgroundColor: colors,
            borderWidth: 0,
            ...dataset,
          })),
        },
        options,
      },
    );
  };

  const renderComboBox = (
    options: string[],
    onChange: (value: string) => void,
    placeholder?: string,
  ) => {
    const comboBox = new OO.ui.ComboBoxInputWidget({
      value: '',
      options: options
        .map((option) => ({ data: option }))
        .sort((a, b) =>
          (a.data > b.data) ? 1 : (b.data > a.data) ? -1 : 0,
        ),
      menu: { filterFromInput: true },
      placeholder,
    });
    comboBox.on('change', onChange);
    return comboBox;
  };

  const loadSummary = () => {
    const pagePromise = getPage(pages.summary);
    const countPromise = getPageWithHistory(pages.counts);

    Promise.all([ chartPromise, pagePromise, countPromise ]).then(
      ([ _, summaryData, countsData ]) => {
        if (!summaryData || !countsData) return;
        $('#gdm-dashboard-summary').empty().append(`
      <h2>Total reports</h2>
      <div class="gdmd-counts-chart"><canvas id="chartCounts" height="100px"/></div>
      <div class="gdmd-charts">
        <div class="gdmd-chart">
          <h2>Wikis with reports, per vertical</h2>
          <div class="gdmd-chart-container"><canvas id="chartPerVertical"/></div>
        </div>
        <div class="gdmd-chart">
          <h2>Wikis with reports, per language</h2>
          <div class="gdmd-chart-container"><canvas id="chartPerLang"/></div>
        </div>
        <div class="gdmd-chart">
          <h2>Number of reports, per platform</h2>
          <div class="gdmd-chart-container"><canvas id="chartPerPlatform"/></div>
        </div>
      </div>
    `);
        const sums = getSums(parseFields(summaryData).map(convertSummarySchema));
        const counts = convertCountSchema(countsData);

        if (Chart) {
          createChart(
            'line',
            'chartCounts',
            counts.map((entry) => entry.timestamp),
            [
              {
                label: 'Wikis',
                data: counts.map((entry) => entry.data.wikis),
                backgroundColor: colors[5],
                fill: false,
                borderColor: colors[5],
                borderWidth: 3,
                borderDash: [ 10, 10 ],
                yAxisID: 'y',
              },
              {
                label: 'Reports',
                data: counts.map(
                  (entry) =>
                    entry.data.forum +
                    entry.data.wall +
                    entry.data.articleComment,
                ),
                backgroundColor: colors[3],
                fill: false,
                borderColor: colors[3],
                borderWidth: 3,
                yAxisID: 'y1',
              },
              {
                label: 'Discussions',
                data: counts.map((entry) => entry.data.forum),
                backgroundColor: colors[0],
                fill: false,
                borderColor: colors[0],
                borderWidth: 3,
                yAxisID: 'y2',
              },
            ],
            {
              ...defaultChartOptions,
              scales: {
                yAxes: [
                  {
                    id: 'y',
                    type: 'linear',
                    position: 'left',
                  },
                  {
                    id: 'y1',
                    type: 'linear',
                    position: 'right',
                  },
                  {
                    id: 'y2',
                    type: 'linear',
                    position: 'right',
                  },
                ],
                xAxes: [
                  {
                    stacked: true,
                    type: 'time',
                    time: {
                      unit: 'day',
                      displayFormats: {
                        day: 'YY/MM/DD',
                      },
                    },
                  },
                ],
              },
              tooltips: {
                mode: 'x',
              },
            },
          );
          createChart('pie', 'chartPerVertical', Object.keys(sums.verticals), [
            {
              label: '# wikis with reports',
              data: Object.values(sums.verticals).map((v) => v.wikis),
            },
          ]);
          const langData = convertToOther(sums.langs, 10, 'wikis');
          createChart('pie', 'chartPerLang', Object.keys(langData), [
            {
              label: '# wikis with reports',
              data: Object.values(langData).map((v) => v.wikis),
            },
          ]);
          createChart(
            'pie',
            'chartPerPlatform',
            [ 'Discussions', 'Article comments', 'Wall' ],
            [
              {
                label: '# reports',
                data: [ sums.forum, sums.articleComment, sums.wall ],
              },
            ],
          );
        }
      },
    );
  };

  const loadReports = (type: 'wr' | 'gdm', { user, lang, vertical, limit }: GDMDParams) => {
    const mustacheLoad = mw.loader.using([
      'oojs-ui-windows',
      'mediawiki.template.mustache',
      'mediawiki.api',
    ]);
    if (user) filterStates.wr = user;
    if (lang) filterStates.lang = lang;
    if (vertical) filterStates.vertical = vertical;
    if (limit) filterStates.limit = limit;
    const pagePromise = getPage(pages[type]);
    Promise.all([ mustacheLoad, pagePromise, chartPromise ]).then(([ _, page ]) => {
      if (!page) return;
      const wikiReports = parseFields(page).map(convertWikiSchema);
      const wrIds = new Set(wikiReports.map(wiki => wiki.wikiRepresentative));
      const languages = Array.from(
        new Set(wikiReports.map((wiki) => wiki.lang)),
      );
      const verticals = Array.from(
        new Set(wikiReports.map((wiki) => wiki.vertical)),
      );
      getUserDetails(Array.from(wrIds)).then(users => {
        const wikiReportsWithWR = wikiReports.map(report => ({
          ...report,
          wrUsername: users.users[report.wikiRepresentative]?.username || '',
        }));
        const userMap: Record<string, string> = {};
        Object.entries(users.users).forEach(([ id, { username } ]: any) => {
          userMap[username] = id;
        });
        $('#gdm-dashboard').empty().append('<div id="gdmd-search"></div><div id="gdmd-report-table"></div>');

        const wr = renderComboBox(
          Object.keys(userMap),
          (value) => {
            filterStates.wr = value;
            if (previous.wr !== value) {
              filterStates.page = 1; // reset page if wr changed
            }
            memoRenderTable(wikiReportsWithWR, userMap, filterStates, onPageChange);
          },
          'Enter a username',
        );
        const language = renderComboBox(
          languages,
          (value) => {
            filterStates.lang = value;
            if (previous.lang !== value) {
              filterStates.page = 1; // reset page if lang changed
            }
            memoRenderTable(wikiReportsWithWR, userMap, filterStates, onPageChange);
          },
          'Language',
        );
        const vertical = renderComboBox(
          verticals,
          (value) => {
            filterStates.vertical = value;
            if (previous.vertical !== value) {
              filterStates.page = 1; // reset page if vertical changed
            }
            memoRenderTable(wikiReportsWithWR, userMap, filterStates, onPageChange);
          },
          'Vertical',
        );
        const sort = renderDropdown<TableState['sortby']>(
          [
            { data: 'forum', label: 'Posts' },
            { data: 'wall', label: 'Messages' },
            { data: 'articleComment', label: 'Comments' },
            { data: 'domain', label: 'URL' },
          ],
          (value) => {
            filterStates.sortby = value;
            memoRenderTable(wikiReportsWithWR, userMap, filterStates, onPageChange);
          },
        );
        const limit = renderDropdown<number>(
          [ 10, 25, 50, 100, 1000 ].map(num => ({
            data: num,
            label: num.toString(),
          })),
          (value) => {
            if (previous.limit !== value) {
              filterStates.page = 1; // reset page if limit changed
            }
            filterStates.limit = value;
            memoRenderTable(wikiReportsWithWR, userMap, filterStates, onPageChange);
          },
        );

        const topBar = new OO.ui.FieldLayout(
          new OO.ui.Widget({
            content: [
              new OO.ui.HorizontalLayout({
                items: [
                  new OO.ui.FieldLayout(wr, {
                    label: 'Filter by wiki representative',
                    align: 'top',
                  }),
                  new OO.ui.FieldLayout(language, {
                    label: 'Filter by language',
                    align: 'top',
                  }),
                  new OO.ui.FieldLayout(vertical, {
                    label: 'Filter by vertical',
                    align: 'top',
                  }),
                  new OO.ui.FieldLayout(sort, {
                    label: 'Sort by',
                    align: 'top',
                  }),
                  new OO.ui.FieldLayout(limit, {
                    label: 'Limit',
                    align: 'top',
                  }),
                ],
              }),
            ],
          }),
          {
            align: 'top',
          },
        );

        $('#gdmd-search').append(topBar.$element);

        const onPageChange = (page: number) => {
          filterStates.page = page;
          memoRenderTable(wikiReportsWithWR, userMap, filterStates, onPageChange);
        };

        renderTable(wikiReportsWithWR, userMap, filterStates, onPageChange);
      });
    });
  };

  const params = {
    user: mw.util.getParamValue('user'),
    lang: mw.util.getParamValue('lang'),
    vertical: mw.util.getParamValue('vertical'),
    limit: Number(mw.util.getParamValue('limit')),
  };

  switch (mw.config.get('wgPageName')) {
  case 'Data:Dashboard/summary': loadSummary(); break;
  case 'Data:Dashboard/wr': loadReports('wr', params); break;
  case 'Data:Dashboard': loadReports('gdm', params); break;
  default: break;
  }
})(window, jQuery, mw);
