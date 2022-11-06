import {
  ImpressionStake,
  MessageRequestCreated,
  OwnershipTransferred,
} from "../generated/ImpressionStake/ImpressionStake";

import { BigInt } from "@graphprotocol/graph-ts";
import { RequestMessage } from "../generated/schema";
import { sendEPNSNotification } from "./EPNSNotification";

export function handleMessageRequestCreated(
  event: MessageRequestCreated
): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = new RequestMessage(event.transaction.from.toHex());

  // Entity fields can be set based on event parameters
  entity.messageHash = event.params.msgHash;
  entity.from = event.params.from;
  entity.to = event.params.to;
  entity.amount = event.params.amount;

  // Entities can be written to the store with `.save()`
  entity.save();

  let recipient = "0xB0853B57326e08aA536663D6aC78304c0b3E38Da",
    type = "1",
    title = "New AD Received",
    body = `${event.params.msgHash}`,
    subject = "New AD Received",
    message = `${event.params.msgHash}`,
    image = "null",
    secret = "null",
    cta = "";

  let notification = `{\"type\": \"${type}\", \"title\": \"${title}\", \"body\": \"${body}\", \"subject\": \"${subject}\", \"message\": \"${message}\", \"image\": \"${image}\", \"secret\": \"${secret}\", \"cta\": \"${cta}\"}`;
  sendEPNSNotification(recipient, notification);

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.charityFund(...)
  // - contract.charityParam(...)
  // - contract.getMessageRequest(...)
  // - contract.impressionTokenAddress(...)
  // - contract.owner(...)
  // - contract.requestId(...)
  // - contract.userCost(...)
}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}
