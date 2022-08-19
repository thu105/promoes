---
layout: Post
title: Affordable Firewall for SMBs
subtitle: Designing and implementing an enterprise-grade firewall on an old computer.
date: 2022-08-18
author: Hein Thu
useHeaderImage: true
headerImage: /img/posts/default.jpg
headerMask: rgba(0, 0, 0, .5)
tags:
 - Project
 - TCP/IP
 - Firewall
 - Security
 - VPN
permalinkPattern: /post/:year/:month/:day/:slug/
---

## Background
A small business of my friend has been using a router for over a decade which was sufficient for a time being. However, it became an issue once they wanted to access their server remotely. They first tried opening the RDP port which got subjected to credential stuffing almost immediately. Then, they moved on to using PPTP VPN but that still had several issues. The authentication and connection were unreliable, PPTP has many known vulnerabilities, and some of the services did not function correctly while on the VPN. Once COVID lockdown started and people started working from home, the issues exacerbated so they reached out to me for a solution.

## Why OPNSense?
First, they could not afford an enterprise firewall from vendors like SonicWall and Cisco, and they did not have expertise to manage them either. Although I have worked on several ransomware recovery projects, I specialize in app and OS security, so I have little knowledge on network administration. So, I turned to open-source projects and found [pfSense](https://www.pfsense.org/) and [OPNSense](https://opnsense.org/). While both provided all the features I needed, I favored OPNSense due to its cleaner user interface and user experience.

## Setting Up
### Hardware Sizing
OPNSense documentation provides three hardware specifications: minimum, reasonable, and recommended. The business has less than 100 Mbps throughput so the required specs are only 1 GHz dual core CPU, 2GBs of RAM, 2 Gbit Ethernet ports, and 4 GBs of storage. To cut hardware cost, I repurposed an old computer that they did not use.

For details of other specifications, please visit OPNSense's [hardware sizing & setup](https://docs.opnsense.org/manual/hardware.html#hardware-sizing-setup) guide.

## Installation
The installation was quite straightforward. I followed their [installation guide](https://docs.opnsense.org/manual/install.html) and successfully installed the new OS onto the computer. I configured the WAN and LAN port on the computer and the remaining setup was done through their web interface.
## Features
OPNSense comes with all the features of a commercial-grade firewall and more can be added through plugins. Please check their website for all the features sets. Here are some of the features I implemented:
### Firewall Rules
The interface to setup firewall rules are very intuitive. I separated server, clients, and VPN clients into separate subnets and implemented firewall to allow only specific type of traffic between them. Some of the ports also needed to be opened to allow VPN traffic through. Please refer to [firewall manual](https://docs.opnsense.org/manual/firewall.html) for more details.
### OpenVPN
I created a SSLVPN that required a client certificate, a password, and an OTP code to access the VPN. Two OpenVPN servers were created to separate normal users from super users. Full instrcution can be found [here](https://docs.opnsense.org/manual/how-tos/sslvpn_client.html). 
### LDAP
Both VPN and website login uses LDAP to authenticate against an AD server so both authentication and access control are managed under a central system. The [feature](https://docs.opnsense.org/manual/how-tos/user-ldap.html) comes default with the original installation.
### ACME Client
I upgraded the admin page to use HTTPS using a SSL certificate from Let’s Encrypt. The certificate is routinely updated by ACME client.
### DHCP Server
DHCP is used to dynamically assign and reserve IP addresses for all servers and clients.
### Dynamic DNS
[DDNS client](https://docs.opnsense.org/manual/dynamic_dns.html) is always updating the hostname with the firewall’s IP address so that the VPN users only need to know a memorable hostname instead of an IP address to connect. Additionally, if the public IP changes for some reasons, it will be dynamically updated.
### Monitoring
The firewall is constantly (monitoring)[https://docs.opnsense.org/manual/monit.html] its resources and sends SMTP notification emails if any resources become overwhelmed.
### Unbound DNS
(Unbound)[https://docs.opnsense.org/manual/unbound.html] is used to filter suspicious websites, provide DNSSEC, and sends DNS over TLS to Cloudflare’s DNS servers.

## Conclusion
Overall, OPNSense has provided me with a pleasant experience. There were several times I misconfigured the firewall and got locked out but I was able to get back in through console access. So far, the firewall has not gone through any bugs and the VPN connections are flawless. 

## Related Posts