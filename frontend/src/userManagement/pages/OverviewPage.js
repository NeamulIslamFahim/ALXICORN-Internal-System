import React, { Component } from "react";
import { AppContext, PAGE_OPTIONS } from "../context/AppContext";
import MetricCard from "../components/overview/MetricCard";
import ChartCard from "../components/overview/ChartCard";
import GroupedBarChart from "../components/overview/GroupedBarChart";
import DonutChart from "../components/overview/DonutChart";
import ProgressChart from "../components/overview/ProgressChart";
import ManagementTabs from "../components/layout/ManagementTabs";
import CompactSelect from "../components/layout/CompactSelect";
import { buildOverviewAnalytics, buildOverviewScopeOptions } from "../utils/overviewAnalytics";
import ManagementPage from "./ManagementPage";
import pageStyles from "./pages.module.css";

export default class OverviewPage extends ManagementPage {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    this.state = {
      scopeMode: "ALL",
      scopeId: "",
    };
  }

  getScopedOptionValue(mode, users, teams) {
    if (mode === "TEAM") {
      return teams[0]?.id || "";
    }

    if (mode === "PERSON") {
      return users[0]?.id || "";
    }

    return "";
  }

  render() {
    const { users, teams } = this.context;
    const scopeOptions = buildOverviewScopeOptions(users, teams);
    const analytics = buildOverviewAnalytics(users, teams, this.state.scopeMode, this.state.scopeId);

    const detailOptions =
      this.state.scopeMode === "TEAM"
        ? scopeOptions.teamOptions
        : this.state.scopeMode === "PERSON"
          ? scopeOptions.personOptions
          : [];

    return (
      <section className={pageStyles.pageCard}>
        <div className={pageStyles.hero}>
          <div className={pageStyles.heroCopy}>
            <h1 className={pageStyles.pageTitle}>User Management Overview</h1>
            <p className={pageStyles.pageNote}>Track delivery load, task health, and workforce performance in one operational snapshot.</p>
          </div>
        </div>

        <section className={pageStyles.managementShell}>
          <ManagementTabs activePage={PAGE_OPTIONS.OVERVIEW} onNavigate={(page) => this.navigateToPage(page)} />

          <div className={pageStyles.overviewShell}>
            <div className={pageStyles.overviewToolbar}>
              <div className={pageStyles.overviewToolbarCopy}>
                <h2 className={pageStyles.overviewToolbarTitle}>Performance Monitor</h2>
                <p className={pageStyles.pageNote}>Filter the dashboard by workspace, team, or person to compare the same KPIs across the organization.</p>
              </div>

              <div className={pageStyles.overviewFilterRow}>
                <CompactSelect
                  value={this.state.scopeMode}
                  onChange={(value) =>
                    this.setState({
                      scopeMode: value,
                      scopeId: this.getScopedOptionValue(value, users, teams),
                    })
                  }
                  options={scopeOptions.scopeModes.map((option) => ({
                    value: option.value,
                    label: `Filter: ${option.label}`,
                  }))}
                />

                {this.state.scopeMode !== "ALL" ? (
                  <CompactSelect
                    value={this.state.scopeId}
                    onChange={(value) => this.setState({ scopeId: value })}
                    options={detailOptions}
                  />
                ) : null}
              </div>
            </div>

            <div className={pageStyles.overviewSummaryGrid}>
              {analytics.metrics.map((metric) => (
                <MetricCard
                  key={metric.label}
                  label={metric.label}
                  value={metric.value}
                  delta={metric.delta}
                  deltaTone={metric.deltaTone}
                  tone={metric.tone}
                  icon={metric.icon}
                />
              ))}
            </div>

            <div className={pageStyles.overviewChartGrid}>
              <ChartCard title="Performance Trend" subtitle={`Monthly performance for ${analytics.scopeLabel}`}>
                <GroupedBarChart data={analytics.monthlyPerformance} />
              </ChartCard>

              <div className={pageStyles.overviewSideCharts}>
                <ChartCard title="Project Performance" subtitle="">
                  <DonutChart
                    data={analytics.projectPerformance}
                    centerValue={`${analytics.performanceValue}%`}
                    centerLabel="Performance"
                  />
                </ChartCard>

                <ChartCard title="Task Distribution" subtitle="">
                  <DonutChart
                    data={analytics.taskDistribution}
                    centerValue={`${analytics.performanceValue}%`}
                    centerLabel="Performance"
                  />
                </ChartCard>
              </div>
            </div>

            <div className={pageStyles.overviewProgressGrid}>
              <ChartCard title="Hours Utilization" subtitle="">
                <ProgressChart
                  utilizationValue={analytics.utilizationValue}
                  currentWeekHours={analytics.currentWeekHours}
                  weeklyCapacity={analytics.weeklyCapacity}
                  weeklyEfficiencyGain={analytics.weeklyEfficiencyGain}
                  hourBreakdown={analytics.hourBreakdown}
                  hourStatus={analytics.hourStatus}
                />
              </ChartCard>
            </div>
          </div>
        </section>
      </section>
    );
  }
}
