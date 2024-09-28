"use strict";(self.webpackChunklearn_data=self.webpackChunklearn_data||[]).push([[6050],{2789:(e,t)=>{t.A=(e,t)=>{const o=e.__vccOpts||e;for(const[e,i]of t)o[e]=i;return o}},5396:(e,t,o)=>{o.r(t),o.d(t,{comp:()=>r,data:()=>s});var i=o(7829);const n=[(0,i.Fv)('<h2 id="一、查看网络前缀访问优先级" tabindex="-1"><a class="header-anchor" href="#一、查看网络前缀访问优先级"><span>一、查看网络前缀访问优先级</span></a></h2><p>​ 先查看Windows10/11 中访问网站时 IPv4/IPv6 的优先级，可以看到 IPv6(<code>::/0</code>)比 IPv4(<strong><code>::ffff:0:0/96</code></strong>) 的优先级高，所以ipv6会被优先访问。</p><blockquote><p>优先顺序越大优先级越高，会优先访问。</p><p>命令：<strong>netsh interface ipv6 show prefixpolicies</strong></p></blockquote><figure><img src="https://my-img.675222.xyz/fantasy-biji/2024/09/1405768e12b6fd29d031d2981a4c7aaf.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="二、网络前缀含义" tabindex="-1"><a class="header-anchor" href="#二、网络前缀含义"><span>二、网络前缀含义</span></a></h2><p>​ 依次介绍下这些前缀的含义。</p><p>​ Windows10/11 中默认的访问前缀规则是参照 <a href="https://www.rfc-editor.org/rfc/rfc6724#section-2.1" target="_blank" rel="noopener noreferrer">RFC6724: Default Address Selection for Internet Protocol Version 6 (IPv6)</a> 实现的。</p><ul><li><strong><code>::1/128</code></strong>：这是<strong>IPv6本地主机地址</strong>，类似于IPv4中的127.0.0.1，表示回环地址。它用于测试和本地通信，不会发送到网络中。</li><li><strong><code>::/0</code></strong>：这是<strong>默认路由</strong>，类似于IPv4中的<code>0.0.0.0/0</code>，表示所有未被更具体路由匹配的IPv6地址。这意味着这个前缀包含整个IPv6地址空间。</li><li><strong><code>::ffff:0:0/96</code></strong>：这是<strong>IPv4映射的IPv6地址</strong>，用于IPv4和IPv6之间的兼容性。这类地址用于在IPv6栈上表示IPv4地址，通常用于过渡技术。</li><li><strong><code>2002::/16</code></strong>：这是<strong>6to4自动隧道地址</strong>。6to4是一种过渡机制，用于在IPv4互联网传输IPv6流量。<code>2002::/16</code>前缀中的地址将IPv4地址编码到IPv6地址中。</li><li><strong><code>2001::/32</code></strong>：这是<strong>Teredo隧道地址</strong>，用于IPv6通过IPv4网络的过渡。Teredo是一种隧道协议，使NAT（网络地址转换）后的主机可以使用IPv6。</li><li><strong><code>fc00::/7</code></strong>：这是<strong>本地唯一地址（ULA）</strong>，类似于IPv4中的私有地址（如<code>192.168.x.x</code>）。这些地址仅用于本地网络通信，不应该在全球路由器上发布。</li><li><strong><code>fec0::/10</code></strong>：这是<strong>弃用的站点本地地址</strong>，曾经用于类似私有IPv6网络的环境，但由于设计上的问题，已经被替换为<strong>ULA</strong>（<strong><code>fc00::/7</code></strong>）。</li><li><strong><code>3ffe::/16</code></strong>：这是<strong>6bone测试网络地址</strong>。6bone是早期的IPv6测试网络，<code>3ffe::/16</code>前缀分配给了6bone网络，但在2006年停止使用。</li><li><strong><code>::/96</code></strong>：这是<strong>IPv4兼容的IPv6地址</strong>。最初用于IPv6向后兼容IPv4的过渡技术，但这种技术已被弃用。</li></ul><p>详细内容请看 <a href="https://www.iana.org/assignments/iana-ipv6-special-registry/iana-ipv6-special-registry.xhtml" target="_blank" rel="noopener noreferrer">IANA IPv6 Special-Purpose Address Registry</a> 。</p><h2 id="三、调整网络前缀优先级-让-ipv4-访问优先" tabindex="-1"><a class="header-anchor" href="#三、调整网络前缀优先级-让-ipv4-访问优先"><span>三、调整网络前缀优先级，让 IPv4 访问优先</span></a></h2><p>​ 由前面步骤我们知道 IPv6(<strong><code>::/0</code></strong>) 比 IPv4(<strong><code>::ffff:0:0/96</code></strong>) 的优先级高，如果想让ipv4访问优先，我们通过 <strong><code>netsh interface ipv6</code></strong> 命令调整优先级。</p><p>​ Win + S 进入对话框，输入 cmd，选择 <strong><code>以管理员身份运行</code></strong>，执行调整命令，可以看到 IPv4(<strong><code>::ffff:0:0/96</code></strong>) 优先级最高。</p><figure><img src="https://my-img.675222.xyz/fantasy-biji/2024/09/1a5018d2dd6815d088156af60ba9d01e.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>​ 使用ping命令进行验证</p><figure><img src="https://my-img.675222.xyz/fantasy-biji/2024/09/8c4ceb2c99732c334d465c8e4acda11e.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>如果重启电脑后，发现还是 IPv6 访问优先。需要加回 IPv6 的网络前缀，使IPv4 访问优先。</p><blockquote><p>命令：<strong><code>netsh interface ipv6 add prefixpolicy ::/0 40 1</code></strong></p></blockquote><h2 id="四、如何重新让-ipv6-访问优先" tabindex="-1"><a class="header-anchor" href="#四、如何重新让-ipv6-访问优先"><span>四、如何重新让 IPv6 访问优先</span></a></h2><p>​ 因为微软默认ipv6优先，所以恢复ipv6访问优先很简单：重置！</p><blockquote><p>命令：<strong><code>netsh interface ipv6 reset</code></strong></p></blockquote><figure><img src="https://my-img.675222.xyz/fantasy-biji/2024/09/81bbc62658480ca3e8050a4435a2a1c3.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>输入完命令重启计算机即可。</p><p>电脑重启后，<code>ping www.baidu.com</code> 会解析 IPv6 地址，则重置成功。</p>',23)],a={},r=(0,o(2789).A)(a,[["render",function(e,t){return(0,i.uX)(),(0,i.CE)("div",null,n)}]]),s=JSON.parse('{"path":"/posts/2024-09-20-blog_%E7%BD%91%E7%BB%9C_ipv6.html","title":"Windows 10/11 设置 IPv4/IPv6 访问优先级","lang":"zh-CN","frontmatter":{"title":"Windows 10/11 设置 IPv4/IPv6 访问优先级","date":"2024-09-20T00:00:00.000Z","category":["网络"],"tag":["网络配置","使用指南"],"sticky":false,"star":false,"order":-3,"excerpt":"<p>本文介绍了在Windows 10/11系统中，通过命令查看和调整IPv4与IPv6的访问优先级，并提供了切换优先级和重置为默认设置的方法。</p>","description":"一、查看网络前缀访问优先级 ​ 先查看Windows10/11 中访问网站时 IPv4/IPv6 的优先级，可以看到 IPv6(::/0)比 IPv4(::ffff:0:0/96) 的优先级高，所以ipv6会被优先访问。 优先顺序越大优先级越高，会优先访问。 命令：netsh interface ipv6 show prefixpolicies 二、网...","head":[["meta",{"property":"og:url","content":"https://biji.675222.xyz/posts/2024-09-20-blog_%E7%BD%91%E7%BB%9C_ipv6.html"}],["meta",{"property":"og:site_name","content":"Fantasy的笔记"}],["meta",{"property":"og:title","content":"Windows 10/11 设置 IPv4/IPv6 访问优先级"}],["meta",{"property":"og:description","content":"一、查看网络前缀访问优先级 ​ 先查看Windows10/11 中访问网站时 IPv4/IPv6 的优先级，可以看到 IPv6(::/0)比 IPv4(::ffff:0:0/96) 的优先级高，所以ipv6会被优先访问。 优先顺序越大优先级越高，会优先访问。 命令：netsh interface ipv6 show prefixpolicies 二、网..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://my-img.675222.xyz/fantasy-biji/2024/09/1405768e12b6fd29d031d2981a4c7aaf.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-09-28T03:08:48.000Z"}],["meta",{"property":"article:author","content":"Fantasy"}],["meta",{"property":"article:tag","content":"网络配置"}],["meta",{"property":"article:tag","content":"使用指南"}],["meta",{"property":"article:published_time","content":"2024-09-20T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-09-28T03:08:48.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Windows 10/11 设置 IPv4/IPv6 访问优先级\\",\\"image\\":[\\"https://my-img.675222.xyz/fantasy-biji/2024/09/1405768e12b6fd29d031d2981a4c7aaf.png\\",\\"https://my-img.675222.xyz/fantasy-biji/2024/09/1a5018d2dd6815d088156af60ba9d01e.png\\",\\"https://my-img.675222.xyz/fantasy-biji/2024/09/8c4ceb2c99732c334d465c8e4acda11e.png\\",\\"https://my-img.675222.xyz/fantasy-biji/2024/09/81bbc62658480ca3e8050a4435a2a1c3.png\\"],\\"datePublished\\":\\"2024-09-20T00:00:00.000Z\\",\\"dateModified\\":\\"2024-09-28T03:08:48.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Fantasy\\",\\"url\\":\\"https://biji.675222.xyz\\"}]}"],["link",{"rel":"alternate","type":"application/atom+xml","href":"https://biji.675222.xyz/atom.xml","title":"Fantasy的笔记 Atom Feed"}],["link",{"rel":"alternate","type":"application/json","href":"https://biji.675222.xyz/feed.json","title":"Fantasy的笔记 JSON Feed"}],["link",{"rel":"alternate","type":"application/rss+xml","href":"https://biji.675222.xyz/rss.xml","title":"Fantasy的笔记 RSS Feed"}]]},"headers":[{"level":2,"title":"一、查看网络前缀访问优先级","slug":"一、查看网络前缀访问优先级","link":"#一、查看网络前缀访问优先级","children":[]},{"level":2,"title":"二、网络前缀含义","slug":"二、网络前缀含义","link":"#二、网络前缀含义","children":[]},{"level":2,"title":"三、调整网络前缀优先级，让 IPv4 访问优先","slug":"三、调整网络前缀优先级-让-ipv4-访问优先","link":"#三、调整网络前缀优先级-让-ipv4-访问优先","children":[]},{"level":2,"title":"四、如何重新让 IPv6 访问优先","slug":"四、如何重新让-ipv6-访问优先","link":"#四、如何重新让-ipv6-访问优先","children":[]}],"git":{"createdTime":1727020848000,"updatedTime":1727492928000,"contributors":[{"name":"fantasy","email":"127208503+1fantasy1@users.noreply.github.com","commits":3}]},"readingTime":{"minutes":3.11,"words":932},"filePathRelative":"_posts/2024-09-20-blog_网络_ipv6.md","localizedDate":"2024年9月20日","autoDesc":true}')}}]);