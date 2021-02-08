<!--
 * @Author: one-zero
 * @Date: 2021-01-29 17:07:14
 * @Description: 基础表格
-->
<template>
  <div class="mt-table">
    <div class="table-box">
      <div class="table-header">
        <table class="table">
          <colgroup>
            <col style="width:12%;">
            <col style="width:40%">
            <col style="width:25%;">
            <col style="width:23%;">
          </colgroup>
          <thead>
            <tr>
              <td>
                <div class="cell">序号</div>
              </td>
              <td>
                <div class="cell">名称1</div>
              </td>
              <td>
                <div class="cell">名称2</div>
              </td>
              <td>
                <div class="cell">名称3</div>
              </td>
            </tr>
          </thead>
        </table>
      </div>
      <!-- <loading v-if="accidentFreqData.showTip" :loadingstatus="accidentFreqData.loadingStatus"></loading> -->
      <!-- <vue-scroll :ops="opscroll"> -->
      <div class="table-body">
        <table class="table">
          <colgroup>
            <col style="width:12%;">
            <col style="width:40%">
            <col style="width:25%;">
            <col style="width:23%;">
          </colgroup>
          <tbody>
            <tr>
              <td>
                <div class="cell">1</div>
              </td>
              <td>
                <div class="cell">1</div>
              </td>
              <td>
                <div class="cell">1</div>
              </td>
              <td>
                <div class="cell">1</div>
              </td>
            </tr>
            <tr>
              <td>
                <div class="cell">1</div>
              </td>
              <td>
                <div class="cell">1</div>
              </td>
              <td>
                <div class="cell">1</div>
              </td>
              <td>
                <div class="cell">1</div>
              </td>
            </tr>
            <tr>
              <td>
                <div class="cell">1</div>
              </td>
              <td>
                <div class="cell">1</div>
              </td>
              <td>
                <div class="cell">1</div>
              </td>
              <td>
                <div class="cell">1</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- </vue-scroll> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'mtTable'
}
</script>

<style lang="less" scoped>
.mt-table {
  height: 300px;
  padding-top: 32px;
  position: relative;
  font-size: 14px;
  .table-header {
    position: absolute;
    left: 0;
    top: 0;
    .caret-wrapper {
      display: inline-flex;
      flex-direction: column;
      align-items: center;
      width: 10px;
      height: 100%;
      vertical-align: middle;
      cursor: pointer;
      overflow: initial;
      position: relative;
      .sort-caret {
        width: 0;
        height: 0;
        border: 5px solid transparent;
        position: absolute;
        right: 0;
      }
      .ascending {
        border-bottom-color: rgba(0, 201, 227, 0.5);
        top: -5px;
        &.active {
          border-bottom-color: rgba(0, 201, 227, 1);
        }
      }
      .descending {
        border-top-color: rgba(0, 201, 227, 0.5);
        bottom: -1px;
        &.active {
          border-top-color: rgba(0, 201, 227, 1);
        }
      }
    }
  }
  .table-header tr td {
    padding: 0 5px;
    // background-color: #034077;
    font-weight: bold;
    color: #797979;
  }
  .table-body tr {
    cursor: pointer;
    // box-sizing: border-box;
  }
  .table-body tr.active {
    background: #f1f1f1;
    border: 1px solid #999;
  }
  .table-body tr td {
    // height: 0.46rem;
    color: #797979;
    padding: 0 5px;
    // box-sizing: border-box;
  }
  .table {
    border-collapse: collapse;
    border-spacing: 0;
    text-align: center;
    table-layout: fixed;
    word-wrap: break-word;
    word-break: break-all;
    width: 100%;
    td {
      vertical-align: middle;
      border: 1px solid #ddd;
      .cell {
        height: 32px;
        line-height: 32px;
      }
    }
  }
  .table-scroll {
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }
}
</style>
